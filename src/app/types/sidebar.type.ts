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
  isSidebarOpen?: boolean
}
