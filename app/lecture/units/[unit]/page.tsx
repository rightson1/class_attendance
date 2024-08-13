"use client";
import { PageLoading } from "@/components/main/loadingUI";
import { NewClass } from "@/components/modals/new_class";
import LectureUnitDetails from "@/components/pageUI/units/lecture_unit_details";
import { PageTitle } from "@/components/shared/atoms";
import { Button } from "@/components/ui/button";
import { useGetUnit } from "@/lib/hooks/useUnit";
import { Params } from "@/lib/ui_types";
import { Plus } from "lucide-react";
import React from "react";

const Page = ({ params: { unit: unit_id } }: Params<"unit">) => {
  const { data: unit } = useGetUnit(unit_id);
  if (!unit) return <PageLoading />;
  return (
    <div>
      <div className="fb ">
        <PageTitle link="/units" title={unit?.name} />
        <NewClass />
      </div>
      <LectureUnitDetails unit={unit} />
    </div>
  );
};

export default Page;
