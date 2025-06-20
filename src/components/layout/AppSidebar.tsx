import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  Home,
  MessageSquare,
  PenTool,
  Settings,
  Users,
  CreditCard,
  User,
  Building,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/authStore";

const AppSidebar = () => {
  const { logout } = useAuthStore();

  const mainNavItems = [
    { title: "Dashboard", url: "/app/dashboard", icon: Home },
    { title: "Overview", url: "/app/overview", icon: BarChart3 },
    { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
  ];

  const socialNavItems = [
    { title: "Posts", url: "/app/posts", icon: PenTool },
    { title: "Comments", url: "/app/comments", icon: MessageSquare },
    { title: "Schedule", url: "/app/schedule", icon: Calendar },
  ];

  const settingsNavItems = [
    { title: "Profile", url: "/app/settings/profile", icon: User },
    { title: "Team", url: "/app/settings/team", icon: Users },
    { title: "Billing", url: "/app/settings/billing", icon: CreditCard },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Client Nest</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Social Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <button
          onClick={logout}
          className="w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
