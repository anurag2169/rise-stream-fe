"use client";

import { SidebarProps } from "@/app/types/sidebar.type";
import { Button } from "@/components/ui/button";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import React, { useState } from "react";
import SubscriptionBar from "./SubscriptionBar";

const SideBar: React.FC<SidebarProps> = ({
  data,
  isSubmenuOpen,
  isSidebarOpen,
  closeSideBar,
  subscribedChannelDetails,
  showMore = false,
  showMoreHandler = () => {},
}) => {
  return (
    <div className={`flex w-full z-50`}>
      <aside
        className={`mt-14 fixed inset-y-0 left-0 z-10 flex w-64 flex-col bg-background dark:bg-background-dark transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-out `}
      >
        <nav className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar">
          <ul className="space-y-1">
            {data?.map((menu: any) => {
              return (
                <li key={menu.menuId}>
                  <Collapsible open={isSubmenuOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted dark:text-muted-foreground-dark dark:hover:bg-muted-dark">
                      <Link href={!menu.submenu ? menu.routerLink : "#"}>
                        <div
                          className="flex items-center"
                          onClick={closeSideBar}
                        >
                          {menu.Icon && <menu.Icon className="mr-3 h-5 w-5" />}
                          {menu.menuName}
                        </div>
                      </Link>
                      {menu.submenu && (
                        <ChevronDownIcon className="h-5 w-5 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
                      )}
                    </CollapsibleTrigger>
                    {menu.submenu && (
                      <CollapsibleContent className="pl-8 text-muted-foreground dark:text-muted-foreground-dark">
                        <ul className="space-y-1">
                          {menu.subMenuItems.map((submenu: any) => {
                            return (
                              <li
                                key={submenu.subMenuId}
                                onClick={closeSideBar}
                              >
                                <Link
                                  href={submenu.subMenuLink}
                                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted dark:hover:bg-muted-dark"
                                  prefetch={false}
                                >
                                  <div className="flex items-center">
                                    {submenu.Icon && (
                                      <submenu.Icon className="mr-3 h-5 w-5" />
                                    )}
                                    {submenu.subMenuName}
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </li>
              );
            })}
          </ul>

          <>
            <SubscriptionBar
              subscribedChannelDetails={subscribedChannelDetails}
              onCloseSideBar={closeSideBar}
              showMore={showMore}
              showMoreHandler={showMoreHandler}
            />
          </>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
