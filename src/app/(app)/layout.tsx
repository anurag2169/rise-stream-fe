// import Navbar from '@/components/Navbar';

import Navbar from "../components/Navbar";
import { ThemeProvider } from "../providers/theme-provider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
