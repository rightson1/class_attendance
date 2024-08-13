"use client";
import { FieldFilter } from "@/components/atoms/Filters";
import { Table_Wrapper } from "@/components/shared/table_wrapper";
import { TAgent, TAgentFormatted } from "@/lib/data_types";
import { useGetAgents } from "@/lib/hooks/useAgents";
import { ColumnDef, Table } from "@tanstack/react-table";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CiLink } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { PromoteAgent } from "@/components/modals/PromoteAgent";
import AddWhatsapGroupLink from "@/components/modals/AddWhatsapGroupLink";
const AllAgentsTable = () => {
  const { data, isLoading } = useGetAgents();
  const agents = useMemo(() => {
    if (!data) return [];
    return data.map((agent) => ({
      ...agent,
      full_name: (agent.first_name || "") + " " + (agent.last_name || ""),
    }));
  }, [data]);
  const columns: ColumnDef<TAgentFormatted>[] = [
    {
      accessorKey: "full_name",
      header: "Name(s)",
      size: 200,
    },
    //phone
    {
      accessorKey: "phone_number",
      header: "Mobile Number",
      size: 130,
    },
    //organization
    {
      accessorKey: "organization",
      header: "Organization",
      size: 130,
    },
    //reporting to
    {
      accessorKey: "reporting_to",
      header: "Reporting To",
      size: 130,
    },
    {
      //edit
      header: "Actions",
      id: "edit",
      cell: (row) => (
        <div className="flex gap-1">
          <PromoteAgent />
          <AddWhatsapGroupLink />
          <Button size={"smIcon"} variant={"ghost"}>
            <FaCheck />
          </Button>
          <Button size={"smIcon"} variant={"ghost"}>
            <TbListDetails />
          </Button>
        </div>
      ),
      size: 70,
    },
  ];

  return (
    <div className="bg-card p-2 md:p-4 b-card ">
      <Table_Wrapper
        columns={columns}
        data={agents}
        title="All Extention Agents"
        loading={isLoading}
        searchField="full_name"
      />
    </div>
  );
};

export default AllAgentsTable;
