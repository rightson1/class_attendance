"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { IClassWithUnit, IUnit, IUser } from "@/lib/data_types";
import { useCustomToast } from "@/components/atoms/functions";
import { useUpdateStudentInUnit } from "@/lib/hooks/useUnit";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useUpdateStudentInClass } from "@/lib/hooks/useClass";

const StudentInClasses = ({
  all,
  students,
  isPending,
  unit,
  fetchedClass,
}: {
  all?: boolean;
  students?: IUser[];
  isPending: boolean;
  unit: IUnit;
  fetchedClass: IClassWithUnit;
}) => {
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: updateClass } = useUpdateStudentInClass();
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
        return all ? (
          <div className="flex gap-2">
            <Button
              size={"sm"}
              onClick={() => {
                customToast({
                  func: async () => {
                    await updateClass({
                      updateType: "add",
                      class_id: fetchedClass._id,
                      student_id: row.original._id,
                    });
                  },
                });
              }}
            >
              <Plus size={18} />
              Mark as present
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                customToast({
                  func: async () => {
                    await updateClass({
                      updateType: "remove",
                      class_id: fetchedClass._id,
                      student_id: row.original._id,
                    });
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
        data={students || []}
        loading={isPending}
        searchField="name"
      />
    </div>
  );
};

export default StudentInClasses;
