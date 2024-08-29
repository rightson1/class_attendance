"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { useRouter } from "next/navigation";
import { IClassWithLUs, IClassWithStudents } from "@/lib/data_types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/provider/UserAuth";
import Join_Class from "@/components/pageUI/classes/join_class";

export const Student_Unit_Classes = ({
  classes,
}: {
  classes: IClassWithStudents[];
}) => {
  const { user } = useAuth();
  const columns: ColumnDef<IClassWithStudents>[] = [
    {
      accessorKey: "name",
      header: "Title",
    },

    {
      accessorKey: "Attended",
      header: "Students",
      cell: ({ row }) => {
        const attended = row.original.students.length > 0;
        return (
          <Badge
            className={cn(`capitalize`, attended && `bg-green-500 text-white`)}
          >
            {attended ? "Attended" : "Not Attended"}
          </Badge>
        );
      },
    },
    {
      //
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            className={cn(
              `capitalize`,
              status === "cancelled" && `bg-red-500 text-white`
            )}
          >
            {row.original.status}
          </Badge>
        );
      },
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
          <div>
            <Join_Class current_class={row.original} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-card">
      <Table_Wrapper
        columns={columns}
        data={classes}
        loading={false}
        title="Today's Classes"
        searchField="name"
      />
    </div>
  );
};
