"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUnit, IUser } from "@/lib/data_types";
import { useDeleteUser } from "@/lib/hooks/useManageUser";
import { useCustomToast } from "@/components/atoms/functions";
import { useDeleteLectureFromUnit } from "@/lib/hooks/useUnit";

const LectureTable = ({
  unit,
  lectures,
  isPending,
}: {
  lectures: IUser[];
  isPending: boolean;
  unit: IUnit;
}) => {
  const { mutateAsync: deleteUser } = useDeleteLectureFromUnit();
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
            {/* <Button size={"icon"} variant={"ghost"}>
              <Pencil size={18} />
            </Button> */}
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                customToast({
                  func: async () => {
                    await deleteUser(unit._id);
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
        data={lectures || []}
        loading={isPending}
        searchField="name"
      />
    </div>
  );
};

export default LectureTable;
