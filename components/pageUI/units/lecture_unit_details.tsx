import React from "react";
import { CustomTabs } from "@/components/shared/CustomTables";
import StudentInUnit from "./unit_students";
import LectureClassesTable from "../classes/lecture_class";
import { IUnit } from "@/lib/data_types";
import { useGetStudentsInUnit } from "@/lib/hooks/useUnit";
const LectureUnitDetails = ({ unit }: { unit: IUnit }) => {
  const { data: units, isPending } = useGetStudentsInUnit(unit._id);
  return (
    <div>
      <div className="  bg-card rounded-lg md:border border-border ">
        <div className=" fbc border-b border-border rp">
          <h4 className="h4 ">Manage Unit</h4>
          <div className="hid-sm"></div>
        </div>
        <CustomTabs
          tabs={[
            {
              title: "Classes",
              content: <LectureClassesTable />,
            },
            {
              title: "Student",
              content: (
                <StudentInUnit
                  unit={unit}
                  isPending={isPending}
                  students={units}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default LectureUnitDetails;
