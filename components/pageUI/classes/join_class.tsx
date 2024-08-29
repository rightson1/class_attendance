import { useAuth } from "@/components/provider/UserAuth";
import { Button } from "@/components/ui/button";
import { IClassWithStudents } from "@/lib/data_types";
import React from "react";
import { db } from "@/lib/firebase/client";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import {
  useGetClassesByStudent,
  useUpdateStudentInClass,
} from "@/lib/hooks/useClass";
import { useCustomToast } from "@/components/atoms/functions";

const Join_Class = ({
  current_class,
}: {
  current_class: IClassWithStudents;
}) => {
  const { user } = useAuth();
  const { customToast } = useCustomToast();
  const { mutateAsync } = useUpdateStudentInClass();
  const { data: classes, refetch } = useGetClassesByStudent({
    student_id: user?._id!,
    unit_id: current_class.unit,
  });
  const handleJoinClass = async () => {
    if (!user) return;

    customToast({
      func: async () => {
        const classDocRef = doc(db, "classes", current_class._id);
        const classDoc = await getDoc(classDocRef);

        if (classDoc.exists()) {
          const classData = classDoc.data();
          const classLocation = classData?.location;

          if (!classLocation) {
            throw new Error("Class location not available.");
          }

          // Get the student's current location
          const getCurrentLocation = (): Promise<GeolocationPosition> => {
            return new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
          };

          const position = await getCurrentLocation();
          const { latitude, longitude } = position.coords;

          // Function to calculate the distance between two coordinates (in meters)
          const calculateDistance = (
            lat1: number,
            lon1: number,
            lat2: number,
            lon2: number
          ) => {
            console.log({ lat1, lon1, lat2, lon2 });
            const R = 6371e3; // Earth's radius in meters
            const φ1 = (lat1 * Math.PI) / 180;
            const φ2 = (lat2 * Math.PI) / 180;
            const Δφ = ((lat2 - lat1) * Math.PI) / 180;
            const Δλ = ((lon2 - lon1) * Math.PI) / 180;

            const a =
              Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c; // Distance in meters
          };

          // Assuming classLocation contains latitude and longitude
          const distance = calculateDistance(
            latitude,
            longitude,
            classLocation.latitude,
            classLocation.longitude
          );

          if (distance <= 10000) {
            // Add the student to the class
            await mutateAsync({
              updateType: "add",
              class_id: current_class._id,
              student_id: user._id,
            });

            // Optionally, update the class document in Firestore with the student's attendance
            await setDoc(
              doc(db, "classes", current_class._id, "students", user.uid),
              {
                studentId: user.uid,
                joinedAt: serverTimestamp(),
              }
            );
          } else {
            throw new Error("You are too far from the class location.");
          }
        } else {
          throw new Error("Class not found.");
        }
      },
      sfunc: async () => {
        refetch();
      },
    });
  };

  return (
    <Button
      onClick={handleJoinClass}
      disabled={
        !user ||
        !(current_class.status == "active") ||
        current_class.students.length > 0
      }
      size={"sm"}
    >
      Join
    </Button>
  );
};

export default Join_Class;
