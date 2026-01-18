import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { PanelLeft } from "lucide-react";

interface DocLayoutProps {
  children: ReactNode;
}

export const DocLayout = ({ children }: DocLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern overflow-x-hidden">
      <div className="fixed inset-0 bg-mesh-gradient pointer-events-none" />

      {/* Desktop: Floating button to re-open sidebar when collapsed */}
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="hidden md:flex fixed left-4 top-[4.5rem] z-40 p-2 rounded-lg bg-background/80 backdrop-blur-xl border border-border-glass hover:bg-secondary transition-colors"
          aria-label="Open sidebar"
        >
          <PanelLeft className="w-5 h-5 text-foreground" />
        </button>
      )}

      {/* Sidebar - visible on md+ screens */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <main
        className={`min-h-screen relative pt-14 transition-all duration-300 w-full ${
          sidebarCollapsed ? "md:ml-0" : "md:ml-64"
        }`}
      >
        <div className="doc-container animate-fade-in max-w-5xl w-full">
          {children}
        </div>
      </main>
    </div>
  );
};
