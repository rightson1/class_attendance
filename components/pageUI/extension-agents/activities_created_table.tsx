"use client";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { ColumnDef, Table } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FaCheck, FaEye } from "react-icons/fa";

import {
  activities_created,
  TActivitiesCreated,
} from "@/lib/data/table_dummy_data";
import { cn } from "@/lib/utils";
export const ActivitiesCreated = () => {
  const columns: ColumnDef<TActivitiesCreated>[] = [
    {
      accessorKey: "agentName",
      header: "Agent Name",
    },
    {
      accessorKey: "activityName",
      header: "Activity Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "creationDate",
      header: "Creation Date",
    },
    {
      accessorKey: "followUpDate",
      header: "Follow Up Date",
    },
    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => (
        <Button
          size={"sm"}
          variant={"ghost"}
          className={cn(
            "border w-full",
            row.original.status === "created"
              ? "border-secondary text-secondary"
              : ""
          )}
        >
          {row.original.status === "created" ? "Created" : "Sent"}
        </Button>
      ),
    },
    {
      //edit
      header: "Actions",
      id: "edit",
      cell: (row) => (
        <div className="flex gap-1">
          <Button size={"smIcon"} variant={"ghost"}>
            <FaEye />
          </Button>
        </div>
      ),
      size: 70,
    },
  ];

  return (
    <div className="bg-card p-2 md:p-4 b-card">
      <Table_Wrapper
        columns={columns}
        data={activities_created}
        title="Activities Created (Dummy)"
        searchField="agentName"
      />
    </div>
  );
};
