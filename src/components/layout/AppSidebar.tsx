import { LayoutDashboard, GanttChart, BookOpen, Settings, PanelLeft } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const items = [
  { title: "Jan 2026 - Deadlines", url: "/", icon: LayoutDashboard },
  { title: "Timeline", url: "/timeline", icon: GanttChart },
  { title: "Subjects", url: "/subjects", icon: BookOpen },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent className="pt-5">
        {/* Logo — hidden when collapsed */}
        <div className="px-4 pb-6 group-data-[collapsible=offcanvas]:hidden">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-background font-mono">DI</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-foreground font-display">
                Deadline Intel
              </h1>
              <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-[0.2em]">Jan 2026 Term</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-accent/60 transition-colors duration-200"
                      activeClassName="bg-accent text-foreground font-medium"
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

      {/* Trigger lives at the bottom of the sidebar */}
      <SidebarFooter className="border-t border-border/40 p-2">
        <SidebarTrigger className="w-full flex items-center justify-start gap-2 px-2 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors duration-200 text-sm" />
      </SidebarFooter>
    </Sidebar>
  );
}

