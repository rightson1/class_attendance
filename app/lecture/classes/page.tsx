"use client";
import { NewClass } from "@/components/modals/new_class";
import LectureAllClasses from "@/components/pageUI/classes/lecture_all_classes";
import { useAuth } from "@/components/provider/UserAuth";
import { PageTitle } from "@/components/shared/atoms";
import { useGetClassesByLecturer } from "@/lib/hooks/useClass";
import React from "react";
const Classes = () => {
  const { user } = useAuth();
  const { isPending, data: classes } = useGetClassesByLecturer(user?._id);
  return (
    <div className="space-y-5">
      <div className="fb ">
        <PageTitle link="/classes" title="Classes" />
        <NewClass />
      </div>
      <LectureAllClasses classes={classes || []} isPending={isPending} />
    </div>
  );
};

export default Classes;
