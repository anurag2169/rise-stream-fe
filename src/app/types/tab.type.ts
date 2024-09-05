import { ReactNode } from "react";

export interface TabType {
  value: string;
  label: string;
  content: ReactNode;
  isVisible:boolean
}

export interface TabsProps {
  tabs: TabType[];
  activetab?: string
}
