import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

function MainContent({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar();
  return (
    <main className="flex-1 overflow-auto p-6 md:p-8 relative">
      {/* Floating trigger shown only when sidebar is closed */}
      {!open && (
        <SidebarTrigger className="absolute top-4 left-4 z-50 h-8 w-8 rounded-md border border-border/50 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors duration-200 flex items-center justify-center" />
      )}
      {children}
    </main>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
