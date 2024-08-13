"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { months } from "@/lib/data";
import { useGetAgents } from "@/lib/hooks/useAgents";
import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const ExtensionAgentLineChart = () => {
  const { data: agents_raw } = useGetAgents();

  const agents = useMemo(() => {
    if (agents_raw) {
      const counts = agents_raw.reduce((acc, agent) => {
        const month = new Date(agent.creation_time).toLocaleString("default", {
          month: "short",
        });
        if (!acc[month]) {
          acc[month] = { name: month, agents: 0 };
        }
        acc[month].agents++;
        return acc;
      }, {} as Record<string, { name: string; agents: number }>);

      const dat_raw = Object.values(counts);
      const data = months.map((month) => {
        return (
          dat_raw.find((d) => d.name === month) || { name: month, agents: 0 }
        );
      });
      return data;
    }

    return [];
  }, [agents_raw]);

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-sm text-grayish">
          Extention Agent Onborded
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full overflow-y-auto p-0">
        <AreaChart
          width={1000}
          height={250}
          data={agents}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="agents"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </CardContent>
    </Card>
  );
};
