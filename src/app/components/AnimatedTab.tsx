"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TabData {
  value: string;
  label: string;
  content: React.ReactNode;
  Icon: React.ElementType;
  isVisible?: boolean;
}

interface VercelStyleTabsProps {
  tabs: TabData[];
  defaultValue?: string;
  className?: string;
  direction?: "vertical" | "horizontal";
}

const AnimatedTab = ({
  tabs,
  defaultValue,
  className,
  direction = "horizontal",
}: VercelStyleTabsProps) => {
  const [activeTab, setActiveTab] = React.useState(
    defaultValue ||
      (tabs[0]?.isVisible === false && tabs[1]?.isVisible === false)
      ? tabs[2]?.value
      : tabs[0] && tabs[0].isVisible
      ? tabs[0].value
      : tabs[1]?.value
  );
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div>
      <Tabs
        defaultValue={activeTab}
        className={cn("w-full", className)}
        onValueChange={setActiveTab}
      >
        <TabsList
          className={`relative rounded-none border-b-none bg-transparent p-0 ${
            direction === "vertical" ? "flex-col w-10 " : "flex-row"
          } h-12 items-center justify-start `}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredTab(null)}
        >
          {tabs.map(
            (tab) =>
              tab.isVisible !== false && (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "relative h-12 rounded-none border-b-1 border-transparent bg-transparent px-4 font-medium text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
                    "aria-selected:text-foreground",
                    
                    'flex  h-20 flex-col items-center justify-center text-center gap-y-2 mb-2',
                  )}
                  onMouseEnter={() => setHoveredTab(tab.value)}
                >
                  {tab.Icon && <tab.Icon className="mr-0 h-5 w-5" />}
                  {tab.label}
                  {activeTab === tab.value && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded bg-primary"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </TabsTrigger>
              )
          )}
          {/* This motion.div creates a blurred and gradient background that follows the mouse movement
               when the user hovers over the tabs. The background is only visible when a tab is hovered,
               and its opacity is smoothly animated on hover and unhover events. */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 opacity-0 pointer-events-none rounded-full blur-xl dark:opacity-100"
            style={{
              /* The width and height of the background are fixed */
              width: 110,
              height: 40,
              /* The x and y positions of the background are animated based on the mouse x and y positions */
              x: useTransform(mouseX, (value) => value - 75),
              y: useTransform(mouseY, (value) => value - 20),
              /* The opacity of the background is animated based on whether a tab is hovered */
              opacity: hoveredTab ? 1 : 0,
            }}
            transition={{ opacity: { duration: 0.1 } }}
          />
        </TabsList>

        {/* {tabs.map(
          (tab) =>
            tab.isVisible !== false && (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
              >
                {tab.content}
              </TabsContent>
            )
        )} */}
      </Tabs>
    </div>
  );
};

export default AnimatedTab;
