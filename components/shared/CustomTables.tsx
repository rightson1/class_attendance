import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
type Props = {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
  btnbg?: boolean;
};

export const CustomTabs = (props: Props) => {
  return (
    <Tabs
      defaultValue={props.tabs.length > 0 ? props.tabs[0].title : ""}
      className="w-full overflow-hidden -mt-2 "
    >
      <TabsList className="rpx overflow-x-auto overflow-y-hidden  border-b border-border w-full rounded-none justify-start h-[50px]  items-center flex">
        {props.tabs.map((item, index) => (
          <TabsTrigger key={index} value={item.title} btnbg={props.btnbg}>
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {props.tabs.map((item, index) => (
        <TabsContent key={index} value={item.title}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
