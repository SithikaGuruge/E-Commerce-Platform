import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import Footer from "./Footer";
import { theme } from "@/config/theme";
interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div
        className={`flex min-h-screen w-full`}
        style={{ backgroundColor: theme.colors.background.tertiary }}
      >
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="border-b p-4">
            <SidebarTrigger />
          </div>
          <div className="flex-1 p-6">{children}</div>
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  );
}
