"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import { cn } from "@/lib/utils";
import ColorSwitcher from "./colorSwitcher";

export const ColorsTabs = () => {
  const tabs = [
    {
      name: "Background",
      value: "background",
      content: <ColorSwitcher change={"background"} />,
    },
    {
      name: "Dots",
      value: "dots",
      content: <ColorSwitcher change={"dotColor"} />,
    },
    {
      name: "Eyes",
      value: "eyes",
      content: <ColorSwitcher change={"eyeColor"} />,
    },
  ];

  return (
    <Tabs defaultValue="background">
      <TabsList className="flex flex-wrap items-center gap-x-2 gap-y-2 rounded-xl bg-blue-900/20 p-1 lg:flex-nowrap">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "flex w-fit justify-center rounded-lg bg-blue-light px-2 py-3 text-xs font-medium uppercase leading-5 transition-all duration-300 ease-in-out lg:w-full",
              "data-[state=active]:bg-blue-light data-[state=active]:text-foreground data-[state=active]:shadow",
              "data-[state=inactive]:text-blue-600 data-[state=inactive]:opacity-50 data-[state=inactive]:hover:bg-white/[0.12] data-[state=inactive]:hover:text-foreground"
            )}
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-2">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
