"use client";
import NOTFOUND from "@/app/not-found";
import { PageLoading } from "@/components/main/loadingUI";
import { useAuth } from "@/components/provider/UserAuth";
import { BarButton, PageTitle } from "@/components/shared/atoms";
import { Student_Unit_Classes } from "@/components/tables/students/student_unit_classes";
import { useGetClassesByStudent } from "@/lib/hooks/useClass";
import { useGetUnit } from "@/lib/hooks/useUnit";
import { Params } from "@/lib/ui_types";
import { ClipboardPlus } from "lucide-react";
import React, { useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Page = ({ params }: Params<"unit">) => {
  const { user } = useAuth();
  const { data: unit, isPending } = useGetUnit(params.unit);
  const { data: classes, refetch } = useGetClassesByStudent({
    student_id: user?._id!,
    unit_id: params.unit,
  });
  useEffect(() => {
    // Set up a real-time listener for changes in the classes collection where the unit matches
    const q = query(
      collection(db, "classes"),
      where("unit", "==", params.unit)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // When there is any change, refetch the unit data
      refetch();
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [params.unit, refetch]);
  if (unit) {
    return (
      <div>
        <div className="fb">
          <PageTitle title={unit.name} link="/student/unit" />
          <BarButton icon={ClipboardPlus} text="Export" />
        </div>
        <Student_Unit_Classes classes={classes || []} />
      </div>
    );
  } else if (isPending) {
    return <PageLoading />;
  } else {
    return <NOTFOUND />;
  }
};

export default Page;
