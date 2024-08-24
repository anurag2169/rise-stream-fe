import React from "react";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs";
import { TabsProps, TabType } from "@/app/types/tab.type";

const Tab: React.FC<TabsProps> = ({ tabs = [] }) => {
  return (
    <>
      <Tabs
        defaultValue={tabs && tabs.length > 0 ? tabs[0].value : ""}
        className="w-full mt-8"
      >
        <TabsList className="flex border-b">
          {tabs.map((tab: TabType) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab: TabType) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default Tab;
