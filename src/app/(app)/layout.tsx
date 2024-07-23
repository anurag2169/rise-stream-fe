// import Navbar from '@/components/Navbar';

import Navbar from "../components/Navbar";
import SideBar from "../components/ui/sidebar/SideBar";
import { sideBarData } from "../config/sideBarData";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <SideBar data={sideBarData.data}></SideBar>

      {children}
    </div>
  );
}
