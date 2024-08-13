"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { dummyClasses, dummyUnits, IDummyClass, IDummyUnit } from "@/lib/data";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { useRouter } from "next/navigation";
import { format } from "timeago.js";
const ClassesTable = () => {
  const router = useRouter();
  const columns: ColumnDef<IDummyClass>[] = [
    {
      accessorKey: "name",
      header: "Title",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "lecturer",
      header: "Lecture",
    },
    {
      accessorKey: "Students",
      header: "Students",
      accessorFn: (data) => data.students.length,
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      accessorFn: ({ startTime }) => format(startTime),
    },
    {
      accessorKey: "endTime",
      header: "endTime",
      accessorFn: ({ endTime }) => format(endTime),
    },
  ];

  return (
    <div className="bg-card">
      <Table_Wrapper
        columns={columns}
        onRowClick={(row) => {
          router.push(`/units/${row._id}`);
        }}
        data={dummyClasses}
        loading={false}
        title="Today's Classes"
        searchField="name"
      />
    </div>
  );
};

export default ClassesTable;
