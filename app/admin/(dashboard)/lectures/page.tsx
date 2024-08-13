"use client";
import { CreateUser } from "@/components/modals/new_user";
import LectureTable from "@/components/pageUI/units/unit_lecture";
import { PageTitle } from "@/components/shared/atoms";
import { dummyLecturers } from "@/lib/data";
import { useGetUsers } from "@/lib/hooks/useManageUser";
import React from "react";

const Page = () => {
  const { data: lectures, isPending } = useGetUsers("lecture");

  return (
    <div className="space-y-5">
      <div className="fb ">
        <PageTitle link="/admin/lectures" title="Lectures" />
        <CreateUser userType="lecture" />
      </div>
      <LectureTable lectures={lectures || []} isPending={isPending} />
    </div>
  );
};

export default Page;
