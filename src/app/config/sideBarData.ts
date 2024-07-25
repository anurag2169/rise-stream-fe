import {
  ChevronDownIcon,
  DashboardIcon,
  EnvelopeOpenIcon,
  GearIcon,
  HomeIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

import React from "react";
// Define interfaces
interface SubMenuItem {
  subMenuId?: number;
  subMenuName?: string;
  subMenuLink?: string;
}

interface SidebarItem {
  menuId?: number;
  routerLink?: string;
  icon?: String;
  menuName?: string;
  submenu?: boolean;
  subMenuItems?: SubMenuItem[];
}

export interface SidebarProps {
  data?: SidebarItem[];
}

export const sideBarData: SidebarProps = {
  data: [
    {
      menuId: Math.random() * 100,
      menuName: "Home",
      routerLink: "/home",
      icon: "GearIcon",
      submenu: false,
      subMenuItems: [],
    },
    {
      menuId: Math.random() * 99,
      menuName: "Subscriptions",
      routerLink: "/subscriptions",
      icon: "HomeIcon",
      submenu: false,
      subMenuItems: [],
    },
    {
      menuId: Math.random() * 99,
      menuName: "Dashboard",
      routerLink: "/dashboard",
      icon: "HomeIcon",
      submenu: false,
      subMenuItems: [],
    },
    {
      menuId: Math.random() * 99,
      menuName: "You",
      routerLink: "#",
      icon: "DashboardIcon",
      submenu: true,
      subMenuItems: [
        {
          subMenuId: Math.random() * 97,
          subMenuName: "Your Channel",
          subMenuLink: "/channel",
        },
        {
          subMenuId: Math.random() * 97,
          subMenuName: "History",
          subMenuLink: "/history",
        },
        {
          subMenuId: Math.random() * 97,
          subMenuName: "Playlists",
          subMenuLink: "/playlists",
        },
        {
          subMenuId: Math.random() * 97,
          subMenuName: "Your Videos",
          subMenuLink: "/videos",
        },
        {
          subMenuId: Math.random() * 97,
          subMenuName: "Liked Videos",
          subMenuLink: "/liked-videos",
        },
      ],
    },
  ],
};
