"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { dummyClasses, dummyUnits, IDummyClass, IDummyUnit } from "@/lib/data";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { useRouter } from "next/navigation";
import { format } from "timeago.js";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useAuth } from "@/components/provider/UserAuth";
import { useDeleteClass, useGetClassesByLecturer } from "@/lib/hooks/useClass";
import { IClassWithUnit } from "@/lib/data_types";
import { useCustomToast } from "@/components/atoms/functions";
const LectureClassesTable = () => {
  const { user } = useAuth();
  const { data, isPending } = useGetClassesByLecturer(user?._id);
  const router = useRouter();
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: deleteClass } = useDeleteClass();
  const columns: ColumnDef<IClassWithUnit>[] = [
    {
      accessorKey: "name",
      header: "Title",
    },

    {
      accessorKey: "Students",
      header: "Students",
      accessorFn: (data) => data.students.length,
    },
    {
      //date
      accessorKey: "class_date",
      header: "Date",
      accessorFn: (data) => new Date(data.class_date).toDateString(),
      size: 150,
    },
    {
      accessorKey: "start_time",
      header: "Start Time",
    },
    {
      accessorKey: "end_time",
      header: "End Time",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={(e) => {
                e.preventDefault();
                customToast({
                  func: async () => {
                    await deleteClass(row.original._id);
                  },
                });
              }}
            >
              <Trash size={18} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-card">
      <Table_Wrapper
        columns={columns}
        onRowClick={(row) => {
          router.push(`/lecture/classes/${row._id}`);
        }}
        data={data || []}
        loading={isPending}
        title="Today's Classes"
        searchField="name"
      />
    </div>
  );
};

export default LectureClassesTable;
