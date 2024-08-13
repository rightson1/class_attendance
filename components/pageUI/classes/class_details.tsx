import { CustomTabs } from "@/components/shared/CustomTables";
import { IClassWithUnit } from "@/lib/data_types";
import React from "react";
import StudentInClasses from "./lecture_classes";
import { useGetStudentsInClass } from "@/lib/hooks/useClass";
import { useGetStudentsInUnit } from "@/lib/hooks/useUnit";

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
            title: "Lectures",
            content: (
              <StudentInClasses
                isPending={students_attendance_loading}
                unit={fetchedClass.unit}
                students={students_attendance}
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
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default ClassDetails;
