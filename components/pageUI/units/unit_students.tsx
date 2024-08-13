"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { useRouter } from "next/navigation";
import { Plus, Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUnit, IUser } from "@/lib/data_types";
import { useCustomToast } from "@/components/atoms/functions";
import { useUpdateStudentInUnit } from "@/lib/hooks/useUnit";

const StudentInUnit = ({
  addStudent,
  students,
  isPending,
  unit,
}: {
  addStudent?: boolean;
  students?: IUser[];
  isPending: boolean;
  unit: IUnit;
}) => {
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: updateStudent } = useUpdateStudentInUnit();
  const columns: ColumnDef<IUser>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return !addStudent ? (
          <div className="flex gap-2">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                customToast({
                  func: async () =>
                    await updateStudent({
                      student_id: row.original._id,
                      unit_id: unit._id,
                      updateType: "remove",
                    }),
                });
              }}
            >
              <Trash size={18} />
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              size={"sm"}
              onClick={() => {
                customToast({
                  func: async () =>
                    await updateStudent({
                      student_id: row.original._id,
                      unit_id: unit._id,
                      updateType: "add",
                    }),
                });
              }}
            >
              <Plus size={18} />
              Add
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
        data={students || []}
        loading={isPending}
        searchField="name"
      />
    </div>
  );
};

export default StudentInUnit;
