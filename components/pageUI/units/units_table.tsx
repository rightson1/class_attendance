"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { dummyUnits, IDummyUnit } from "@/lib/data";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { useRouter } from "next/navigation";
import { useGetUnits } from "@/lib/hooks/useUnit";
import { IUnit } from "@/lib/data_types";
const UnitTable = () => {
  const router = useRouter();
  const { data: units, isLoading } = useGetUnits();
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
      accessorKey: "lecturer",
      header: "Lecture",
      accessorFn: (data) => {
        return data.lecturer ? data.lecturer.name : "No Lecturer";
      },
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

  return (
    <div className="bg-card">
      <Table_Wrapper
        columns={columns}
        onRowClick={(row) => {
          router.push(`/admin/units/${row._id}`);
        }}
        data={units || []}
        loading={isLoading}
        searchField="name"
      />
    </div>
  );
};

export default UnitTable;
