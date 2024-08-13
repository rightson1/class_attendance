"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { useRouter } from "next/navigation";
import { IUnit } from "@/lib/data_types";
const LecturesUnits = ({
  units,
  isPending,
}: {
  units?: IUnit[];
  isPending: boolean;
}) => {
  const router = useRouter();
  const columns: ColumnDef<IUnit>[] = [
    {
      accessorKey: "name",
      header: "Title",
    },
    {
      accessorKey: "code",
      header: "Code",
    },

    {
      accessorKey: "Students",
      header: "Students",
      accessorFn: (data) => data.students.length,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      accessorFn: (data) => new Date(data.createdAt).toLocaleDateString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      accessorFn: (data) => new Date(data.updatedAt).toLocaleDateString(),
    },
  ];
  console.log(units);
  return (
    <div className="bg-card">
      <Table_Wrapper
        columns={columns}
        onRowClick={(row) => {
          router.push(`/lecture/units/${row._id}`);
        }}
        data={units || []}
        loading={isPending}
        searchField="name"
      />
    </div>
  );
};

export default LecturesUnits;
