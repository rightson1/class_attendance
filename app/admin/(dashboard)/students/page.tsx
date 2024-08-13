"use client";
import { CreateUser } from "@/components/modals/new_user";
import StudentsTable from "@/components/pageUI/units/students_table";
import StudentInUnit from "@/components/pageUI/units/unit_students";
import { PageTitle } from "@/components/shared/atoms";
import { useGetUsers } from "@/lib/hooks/useManageUser";
import React from "react";

const Page = () => {
  const { data: students, isPending } = useGetUsers("student");
  return (
    <div className="space-y-5">
      <div className="fb ">
        <PageTitle link="/admin/students" title="Students" />
        <CreateUser userType="student" />
      </div>
      <StudentsTable students={students || []} isPending={isPending} />
    </div>
  );
};

export default Page;
