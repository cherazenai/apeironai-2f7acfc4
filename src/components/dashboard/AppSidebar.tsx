import {
  LayoutDashboard, MessageSquare, Lightbulb, BookOpen,
  FlaskConical, TestTubes, FolderKanban, User, Settings, LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import logoIcon from "@/assets/logo-icon.png";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Research Copilot", url: "/dashboard/copilot", icon: MessageSquare },
  { title: "Hypothesis Generator", url: "/dashboard/hypotheses", icon: Lightbulb },
  { title: "Paper Library", url: "/dashboard/papers", icon: BookOpen },
  { title: "Simulations", url: "/dashboard/simulations", icon: FlaskConical },
  { title: "Experiments", url: "/dashboard/experiments", icon: TestTubes },
  { title: "Saved Projects", url: "/dashboard/projects", icon: FolderKanban },
];

const accountItems = [
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/50">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logoIcon} alt="ApeironAI" className="w-8 h-8" />
          {!collapsed && <span className="font-heading text-lg text-foreground tracking-tight">ApeironAI</span>}
        </div>

        {!collapsed && user && (
          <div className="px-4 pb-3">
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        {!collapsed && !user && (
          <div className="px-4 pb-3">
            <p className="text-xs text-primary/80">Guest Mode</p>
          </div>
        )}

        <div className="mx-3 border-t border-sidebar-border/30 mb-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/60 text-[10px] uppercase tracking-[0.2em] font-body">
            {!collapsed && "Research Tools"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50 transition-all duration-200 group"
                      activeClassName="bg-sidebar-accent text-primary font-medium shadow-[inset_2px_0_0_hsl(var(--primary))]"
                    >
                      <item.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mx-3 border-t border-sidebar-border/30 my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/60 text-[10px] uppercase tracking-[0.2em] font-body">
            {!collapsed && "Account"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50 transition-all duration-200 group"
                      activeClassName="bg-sidebar-accent text-primary font-medium shadow-[inset_2px_0_0_hsl(var(--primary))]"
                    >
                      <item.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-sidebar border-t border-sidebar-border/30 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <SidebarMenuButton onClick={handleLogout} className="text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Logout</span>}
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton onClick={() => navigate("/login")} className="text-primary hover:text-primary/80 transition-colors">
                <User className="h-4 w-4" />
                {!collapsed && <span>Sign In</span>}
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
