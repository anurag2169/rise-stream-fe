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
        className="mt-4 md:mt-8 mx-2"
      >
        <TabsList
          className={`flex border-b overflow-x-auto no-scrollbar justify-start md:justify-center `}
        >
          {tabs.map((tab: TabType) => (
            <span key={tab.value} className={`${tab.isVisible ? "" : "hidden"}`}>
              <TabsTrigger  value={tab.value}>
                {tab.label}
              </TabsTrigger>
            </span>
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
