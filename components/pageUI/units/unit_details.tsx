import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomTabs } from "@/components/shared/CustomTables";
import StudentInUnit from "./unit_students";
import { AddLecture } from "@/components/modals/add_lecture_unit";
import { IUnit, IUser } from "@/lib/data_types";
import LectureTable from "./unit_lecture";
import { useGetLectureInUnit, useGetStudentsInUnit } from "@/lib/hooks/useUnit";
import { useGetUsers } from "@/lib/hooks/useManageUser";

const UnitDetails = ({ unit }: { unit: IUnit }) => {
  const { data: students_in_class, isPending: fetchingStudents } =
    useGetStudentsInUnit(unit._id);
  const { data: all_students, isLoading: fetch_all_students } =
    useGetUsers("student");
  const { data: lectures } = useGetLectureInUnit(unit._id);

  return (
    <div>
      <div className="  bg-card rounded-lg md:border border-border ">
        <div className=" fbc border-b border-border rp">
          <h4 className="h4 ">Manage Unit</h4>
          <div className="hid-sm">
            <div className="flex gap-1">
              <AddLecture unit={unit} />
              <Button>
                <Plus size={18} />
                <span>Student</span>
              </Button>
            </div>
          </div>
        </div>
        <CustomTabs
          tabs={[
            {
              title: "Lectures",
              content: (
                <LectureTable
                  isPending={false}
                  lectures={lectures || []}
                  // unit={unit}
                />
              ),
            },
            {
              title: "Students in Unit",
              content: (
                <StudentInUnit
                  isPending={fetchingStudents}
                  students={students_in_class}
                  unit={unit}
                />
              ),
            },
            {
              title: "Add Student",
              content: (
                <StudentInUnit
                  addStudent={true}
                  isPending={fetch_all_students}
                  students={all_students?.filter(
                    (student) =>
                      !students_in_class?.find(
                        (student_in_class) =>
                          student_in_class._id === student._id
                      )
                  )}
                  unit={unit}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default UnitDetails;
