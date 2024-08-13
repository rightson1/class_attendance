"use client";
import { NewUnit } from "@/components/modals/new_unit";
import LecturesUnits from "@/components/pageUI/units/lecture_units_table";
import LectureTable from "@/components/pageUI/units/unit_lecture";
import { useAuth } from "@/components/provider/UserAuth";
import { PageTitle } from "@/components/shared/atoms";
import { useGetUnitsByLectureId } from "@/lib/hooks/useUnit";
import React from "react";
const Page = () => {
  const { user } = useAuth();
  const { data: units, isPending } = useGetUnitsByLectureId(user?._id);
  return (
    <div className="space-y-5">
      <div className="fb ">
        <PageTitle link="/units" title="Units" />
      </div>
      <LecturesUnits isPending={isPending} units={units} />
    </div>
  );
};

export default Page;
