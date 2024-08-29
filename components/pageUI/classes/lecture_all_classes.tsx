"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useDeleteClass } from "@/lib/hooks/useClass";
import { IClassWithUnit } from "@/lib/data_types";
import { useCustomToast } from "@/components/atoms/functions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
const LectureAllClasses = ({
  classes,
  isPending,
}: {
  classes: IClassWithUnit[];
  isPending: boolean;
}) => {
  const router = useRouter();
  const { mutateAsync: deleteClass, isPending: deleting } = useDeleteClass();
  const { customToast, loading } = useCustomToast();
  const columns: ColumnDef<IClassWithUnit>[] = [
    {
      accessorKey: "name",
      header: "Title",
    },
    {
      accessorKey: "unit",
      header: "Unit",
      accessorFn: (data) => data.unit.name,
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
          <div className="flex gap-2">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("Are you sure you want to delete this class?")) {
                  customToast({
                    func: async () => {
                      await deleteClass(row.original._id);
                    },
                  });
                }
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
        data={classes}
        loading={isPending}
        title="Today's Classes"
        searchField="name"
      />
    </div>
  );
};

export default LectureAllClasses;
