import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { GuestModeProvider } from "@/hooks/useGuestMode";
import SignupModal from "@/components/SignupModal";

const DashboardLayout = () => {
  const { user } = useAuth();
  const isGuest = !user;

  return (
    <GuestModeProvider isGuest={isGuest}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background relative">
          {/* Animated grid background */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(191_68%_50%/0.04),transparent_70%)]" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(191 68% 50% / 0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0 relative z-10">
            <header className="h-14 flex items-center border-b border-border/50 px-4 backdrop-blur-xl bg-background/60 sticky top-0 z-30">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <span className="ml-4 text-sm font-body text-muted-foreground">
                ApeironAI Dashboard
                {isGuest && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Guest Mode</span>}
              </span>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
              <Outlet />
            </main>
          </div>

          <SignupModal />
        </div>
      </SidebarProvider>
    </GuestModeProvider>
  );
};

export default DashboardLayout;
