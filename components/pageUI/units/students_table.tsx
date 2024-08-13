"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/data_types";
import { useDeleteUser } from "@/lib/hooks/useManageUser";
import { useCustomToast } from "@/components/atoms/functions";

const StudentsTable = ({
  students,
  isPending,
}: {
  students: IUser[];
  isPending: boolean;
}) => {
  const { mutateAsync: deleteUser } = useDeleteUser();
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
        return (
          <div className="flex gap-2">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                if (
                  !window.confirm("Are you sure you want to delete this user?")
                )
                  return;
                customToast({
                  func: async () => {
                    await deleteUser(row.original.uid);
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
        data={students}
        loading={isPending}
        searchField="name"
      />
    </div>
  );
};

export default StudentsTable;
