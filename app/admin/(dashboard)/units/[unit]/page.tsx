"use client";
import { PageLoading } from "@/components/main/loadingUI";
import UnitDetails from "@/components/pageUI/units/unit_details";
import { PageTitle } from "@/components/shared/atoms";
import { useGetUnit } from "@/lib/hooks/useUnit";
import React from "react";

const Unit = ({
  params: { unit: unit_id },
}: {
  params: {
    unit: string;
  };
}) => {
  const { data: unit } = useGetUnit(unit_id);
  if (!unit) {
    return <PageLoading />;
  }
  return (
    <div className="space-y-5">
      <div className="fb ">
        <PageTitle link="/admin/units" title={unit?.name} />
      </div>
      <UnitDetails unit={unit} />
    </div>
  );
};

export default Unit;
