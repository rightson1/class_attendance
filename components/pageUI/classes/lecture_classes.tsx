"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { IUnit, IUser } from "@/lib/data_types";
import { useCustomToast } from "@/components/atoms/functions";
import { useUpdateStudentInUnit } from "@/lib/hooks/useUnit";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

const StudentInClasses = ({
  all,
  students,
  isPending,
  unit,
}: {
  all?: boolean;
  students?: IUser[];
  isPending: boolean;
  unit: IUnit;
}) => {
  const { customToast, loading } = useCustomToast();
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
            <Button size={"sm"} onClick={() => {}}>
              <Plus size={18} />
              Mark as present
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button size={"icon"} variant={"ghost"} onClick={() => {}}>
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
