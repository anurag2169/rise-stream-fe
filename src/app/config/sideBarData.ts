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
import { getUserDataFromLocalStorage } from "../lib/localstorageUtils";

export const getSideBarData = (): SidebarProps => {
  const userData = getUserDataFromLocalStorage();

  const username = userData?.data?.user?.username;

  return {
    data: [
      {
        menuId: Math.random() * 100,
        menuName: "Home",
        routerLink: "/home",
        Icon: HomeIcon,
        submenu: false,
        subMenuItems: [],
      },
      // {
      //   menuId: Math.random() * 99,
      //   menuName: "Subscriptions",
      //   routerLink: `/channel/${username}?query=subscription`,
      //   Icon: CardStackPlusIcon,
      //   submenu: false,
      //   subMenuItems: [],
      // },

      {
        menuId: Math.random() * 99,
        menuName: "You",
        routerLink: `/channel/${username}`,
        Icon: PersonIcon,
        submenu: true,
        subMenuItems: [
          {
            subMenuId: Math.random() * 97,
            subMenuName: "Your Channel",
            subMenuLink: `/channel/${username}`,
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
            subMenuLink: `/channel/${username}?query=playlist`,
            Icon: LineHeightIcon,
          },
          {
            subMenuId: Math.random() * 97,
            subMenuName: "Your Videos",
            subMenuLink: `/channel/${username}?query=videos`,
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
      // {
      //   menuId: Math.random() * 99,
      //   menuName: "Dashboard",
      //   routerLink: "#",
      //   Icon: DashboardIcon,
      //   submenu: true,
      //   subMenuItems: [
      //     {
      //       subMenuId: Math.random() * 97,
      //       subMenuName: "Manager Account",
      //       subMenuLink: `/admin?query=account`,
      //       Icon: AvatarIcon,
      //     },
      //   ],
      // },
    ],
  };
};
