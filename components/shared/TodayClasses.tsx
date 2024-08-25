"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { dummyClasses, dummyUnits, IDummyClass, IDummyUnit } from "@/lib/data";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { useRouter } from "next/navigation";
import { format } from "timeago.js";
import { IClassWithLUs } from "@/lib/data_types";

const ClassesTable = ({ classes }: { classes: IClassWithLUs[] }) => {
  const router = useRouter();
  const columns: ColumnDef<IClassWithLUs>[] = [
    {
      accessorKey: "name",
      header: "Title",
    },
    {
      accessorKey: "lecturer",
      header: "Lecture",
      accessorFn: (row) => row.lecturer.name,
    },
    {
      accessorKey: "unit",
      header: "Lecturer",
      accessorFn: (row) => row.unit.name,
    },
    {
      accessorKey: "Students",
      header: "Students",
      accessorFn: (data) => data.students.length,
    },
    {
      accessorKey: "start_time",
      header: "Start Time",
    },
    {
      accessorKey: "end_time",
      header: "endTime",
    },
  ];

  return (
    <div className="bg-card">
      <Table_Wrapper
        columns={columns}
        onRowClick={(row) => {
          router.push(`/admin/units/${row._id}`);
        }}
        data={classes}
        loading={false}
        title="Today's Classes"
        searchField="name"
      />
    </div>
  );
};

export default ClassesTable;
