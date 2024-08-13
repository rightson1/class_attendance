import { NewUnit } from "@/components/modals/new_unit";
import { PageTitle } from "@/components/shared/atoms";
import { Button } from "@/components/ui/button";
import React from "react";

const Lecture = () => {
  return (
    <div className="space-y-5">
      <div className="fb ">
        <PageTitle link="/units" title="Units" />
        <Button></Button>
      </div>

      {/* <UnitTable /> */}
    </div>
  );
};

export default Lecture;
