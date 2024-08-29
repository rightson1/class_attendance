import { Button } from "@/components/ui/button";
import { IClassWithUnit } from "@/lib/data_types";
import { db } from "@/lib/firebase/client"; // Ensure Firestore is initialized in this file
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useEditClass } from "@/lib/hooks/useClass";
import { useCustomToast } from "@/components/atoms/functions";

export const StartClass = ({
  current_class,
}: {
  current_class: IClassWithUnit;
}) => {
  const { mutateAsync, isPending } = useEditClass();
  const { customToast } = useCustomToast();
  const handleStartClass = async () => {
    const status = current_class.status == "active" ? "ended" : "active";
    customToast({
      func: async () => {
        await mutateAsync({
          _id: current_class._id,
          status: status,
        });

        let location = null;
        if (navigator.geolocation) {
          location = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              },
              (error) => reject(error)
            );
          });
        }

        await setDoc(doc(db, "classes", current_class._id), {
          classId: current_class._id,
          status: status,
          unit: current_class.unit,
          location: location || "Location not available",
          startedAt: serverTimestamp(),
          additionalDetails: {},
        });
      },
    });
  };

  return (
    <Button onClick={handleStartClass} disabled={isPending}>
      {current_class.status == "active" ? "End Class" : "Start Class"}
    </Button>
  );
};
