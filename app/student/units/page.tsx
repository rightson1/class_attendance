"use client";
import { BarButton, PageTitle } from "@/components/shared/atoms";
import { StudentsUnits } from "@/components/tables/students/student_units";
import { useGetStudentUnits } from "@/lib/hooks/useStudent";
import { ClipboardPlus } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="fb">
        <PageTitle title="Units" link="/student/units" />
        <BarButton icon={ClipboardPlus} text="Export" />
      </div>
      <StudentsUnits />
    </div>
  );
};

export default Page;
