"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { IUnitWithLecture } from "@/lib/data_types";
import { useGetStudentUnits } from "@/lib/hooks/useStudent";
import { useAuth } from "@/components/provider/UserAuth";
import { useRouter } from "next/navigation";
export const StudentsUnits = () => {
  const { user } = useAuth();
  const { data: units, isPending } = useGetStudentUnits(user?._id);
  const router = useRouter();
  const columns: ColumnDef<IUnitWithLecture>[] = [
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
        data={units || []}
        loading={isPending}
        searchField="name"
        onRowClick={(row) => {
          router.push(`/student/units/${row._id}`);
        }}
      />
    </div>
  );
};
