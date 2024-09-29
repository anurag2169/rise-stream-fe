interface SubMenuItem {
  subMenuId?: number;
  subMenuName?: string;
  subMenuLink?: string;
  Icon?: React.ElementType;
}

interface SidebarItem {
  menuId?: number;
  routerLink?: string;
  Icon?: React.ElementType;
  menuName?: string;
  submenu?: boolean;
  subMenuItems?: SubMenuItem[];
}

export interface SidebarProps {
  data?: SidebarItem[];
  isSubmenuOpen?: boolean;
  isSidebarOpen?: boolean;
  closeSideBar?: any;
  subscribedChannelDetails?: SubscribedChannelDetail[];
  showMore?: boolean;
  showMoreHandler?: () => void;
}

export interface Channel {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
}

export interface SubscribedChannelDetail {
  _id: string;
  subscriber: string;
  channel: Channel;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubscribedChannelProps {
  subscribedChannelDetails?: SubscribedChannelDetail[];
  onCloseSideBar: () => void;
  showMore?: boolean;
  showMoreHandler?: () => void;
}
