import { NewUnit } from "@/components/modals/new_unit";
import UnitTable from "@/components/pageUI/units/units_table";
import { PageTitle } from "@/components/shared/atoms";
import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-5">
      <div className="fb ">
        <PageTitle link="/admin/units" title="Units" />
        <NewUnit />
      </div>

      <UnitTable />
    </div>
  );
};

export default Page;
