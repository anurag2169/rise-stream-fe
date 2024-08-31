import {
  DashboardIcon,
  HomeIcon,
  AvatarIcon,
  RotateCounterClockwiseIcon,
  LineHeightIcon,
  VideoIcon,
  HeartIcon,
  CardStackPlusIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

import { SidebarProps } from "../types/sidebar.type";

export const sideBarData: SidebarProps = {
  data: [
    {
      menuId: Math.random() * 100,
      menuName: "Home",
      routerLink: "/home",
      Icon: HomeIcon,
      submenu: false,
      subMenuItems: [],
    },
    {
      menuId: Math.random() * 99,
      menuName: "Subscriptions",
      routerLink: "/subscriptions",
      Icon: CardStackPlusIcon,
      submenu: false,
      subMenuItems: [],
    },
    {
      menuId: Math.random() * 99,
      menuName: "Dashboard",
      routerLink: "/dashboard",
      Icon: DashboardIcon,
      submenu: false,
      subMenuItems: [],
    },
    {
      menuId: Math.random() * 99,
      menuName: "You",
      routerLink: "#",
      Icon: PersonIcon,
      submenu: true,
      subMenuItems: [
        {
          subMenuId: Math.random() * 97,
          subMenuName: "Your Channel",
          subMenuLink: "/channel",
          Icon: AvatarIcon,
        },
        {
          subMenuId: Math.random() * 97,
          subMenuName: "History",
          subMenuLink: "/watchHistory",
          Icon: RotateCounterClockwiseIcon,
        },
        {
          subMenuId: Math.random() * 97,
          subMenuName: "Playlists",
          subMenuLink: "/playlists",
          Icon: LineHeightIcon,
        },
        {
          subMenuId: Math.random() * 97,
          subMenuName: "Your Videos",
          subMenuLink: "/videos",
          Icon: VideoIcon,
        },
        {
          subMenuId: Math.random() * 97,
          subMenuName: "Liked Videos",
          subMenuLink: "/liked-videos",
          Icon: HeartIcon,
        },
      ],
    },
  ],
};
