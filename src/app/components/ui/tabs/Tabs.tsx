import React, { useEffect, useState } from "react";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs";
import { TabsProps, TabType } from "@/app/types/tab.type";

const Tab: React.FC<TabsProps> = ({ tabs = [], activetab }) => {
  const [activeTab, setActiveTab] = useState(activetab);

  useEffect(() => {
    if (activetab !== activeTab) {
      setActiveTab(activetab);
    }
  }, [activetab]);

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
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
