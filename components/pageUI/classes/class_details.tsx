import { CustomTabs } from "@/components/shared/CustomTables";
import { IClassWithUnit } from "@/lib/data_types";
import React from "react";
import { useGetStudentsInClass } from "@/lib/hooks/useClass";
import { useGetStudentsInUnit } from "@/lib/hooks/useUnit";
import StudentInClasses from "./students_in_class";

const ClassDetails = ({ fetchedClass }: { fetchedClass: IClassWithUnit }) => {
  const { data: students_attendance, isPending: students_attendance_loading } =
    useGetStudentsInClass(fetchedClass._id);
  const { data: all_students, isPending: all_students_loading } =
    useGetStudentsInUnit(fetchedClass.unit._id);

  return (
    <>
      <CustomTabs
        tabs={[
          {
            title: "Students in Class",
            content: (
              <StudentInClasses
                isPending={students_attendance_loading}
                unit={fetchedClass.unit}
                students={students_attendance}
                fetchedClass={fetchedClass}
              />
            ),
          },
          {
            title: "Students in Unit",
            content: (
              <StudentInClasses
                isPending={all_students_loading}
                unit={fetchedClass.unit}
                students={all_students}
                all={true}
                fetchedClass={fetchedClass}
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default ClassDetails;
