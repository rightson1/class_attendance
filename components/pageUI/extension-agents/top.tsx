"use client";
import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaAngleRight } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Separator } from "@/components/ui/separator";
import { AreaChart, Area } from "recharts";
import { useGetAgents } from "@/lib/hooks/useAgents";
import { IoIosArrowRoundUp } from "react-icons/io";
Chart.register(ArcElement);
export const ExtensionAgentTop = () => {
  const { data: agents_raw } = useGetAgents();

  const agents = useMemo(() => {
    if (agents_raw) {
      const counts = agents_raw.reduce(
        (acc, agent) => {
          if (agent.gender === "Male") acc.maleCount++;
          else if (agent.gender === "Female") acc.femaleCount++;
          else acc.otherCount++;
          return acc;
        },
        { maleCount: 0, femaleCount: 0, otherCount: 0 }
      );

      const totalCount = agents_raw.length;

      return [
        {
          label: "Male",
          value: counts.maleCount,
          color: "#FFC107",
          share: `${((counts.maleCount / totalCount) * 100).toFixed(2)}%`,
        },
        {
          label: "Female",
          value: counts.femaleCount,
          color: "#FF6384",
          share: `${((counts.femaleCount / totalCount) * 100).toFixed(2)}%`,
        },
        {
          label: "Other",
          value: counts.otherCount,
          color: "#36A2EB",
          share: `${((counts.otherCount / totalCount) * 100).toFixed(2)}%`,
        },
      ];
    }

    return [];
  }, [agents_raw]);
  const this_month_increase = useMemo(() => {
    if (agents_raw) {
      const this_month = agents_raw.filter((agent) => {
        return (
          new Date(agent.creation_time).getMonth() === new Date().getMonth()
        );
      });

      const last_month = agents_raw.filter((agent) => {
        return (
          new Date(agent.creation_time).getMonth() === new Date().getMonth() - 1
        );
      });

      if (last_month.length === 0) {
        // Return a specific value or handle this case in a way that makes sense for your application
        return 100; // 100% increase
      }

      return (
        ((this_month.length - last_month.length) / last_month.length) * 100
      );
    }

    return 0;
  }, [agents_raw]);

  return (
    <div className="grid-1-2-3">
      <div className="md:col-span-2 space-y-2">
        <div className="flex-col md:flex-row fb items-start space-y-2">
          <h3 className="h3 text-[#506C55]">Extension Agent Overview</h3>
          <div className="flex w-full justify-between md:justify-end md:gap-4">
            <div>
              <Button variant={"outline"} size={"sm"} className="bg-card">
                Days
              </Button>
              <Button variant={"outline"} size={"sm"} className="bg-card">
                Weeks
              </Button>
              <Button size={"sm"}>Months</Button>
            </div>
            <Button variant={"outline"} className="bg-card">
              <LiaFileDownloadSolid className="mr-2 text-xl" />
              <span>Jan-Dec,019</span>
            </Button>
          </div>
        </div>
        <div className="w-full">
          <Card className="w-full lg:w-1/2">
            <CardHeader>
              <CardTitle className="text-sm text-grayish">
                No Of Extension Agents
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-start justify-between">
              <div>
                <span className="text-2xl font-bold">
                  {
                    //total agents
                    agents_raw?.length
                  }
                </span>
                <div className="flex text-sm items-center">
                  <span className="text-[#3DD598]">
                    {
                      //increase in percentage
                      this_month_increase
                    }
                    %
                  </span>
                  <IoIosArrowRoundUp className="text-[#3DD598] text-xl" />
                  <span>than last month</span>
                </div>
              </div>
              <div className="-mt-10">
                <AreaChart
                  width={100}
                  height={100}
                  data={agents.map((item) => ({
                    name: item.label,
                    value: item.value,
                  }))}
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

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-full md:col-span-2 lg:col-span-1 ">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Gender Distribution
            </CardTitle>
            <CardContent className="w-full p-0 space-y-2">
              <div className="flex justify-between items-start gap-3 w-full">
                <div className="w-28 h-28">
                  <Doughnut
                    data={{
                      labels: agents.map((item) => item.label),
                      datasets: [
                        {
                          data: agents.map((item) => item.value),
                          backgroundColor: agents.map((item) => item.color),
                          borderWidth: 1,
                          borderColor: "#fff",
                        },
                      ],
                    }}
                  />
                </div>

                <div className="flex justify-center flex-col gap-4 ">
                  {agents.map((item, index) => {
                    return (
                      <div key={index} className="fbc gap-2">
                        <div
                          className={`w-4 h-4 rounded-full`}
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.label}</span>
                        <span className="pl-2 font-semibold">
                          {
                            //percentage
                            item.share
                          }
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Separator />
              <Button size={"sm"} variant={"link"}>
                <span>More Insights</span>
                <FaAngleRight className="ml-2" />
              </Button>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
