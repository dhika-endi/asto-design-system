import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, PanelLeft } from "lucide-react";

interface DocLayoutProps {
  children: ReactNode;
}

export const DocLayout = ({ children }: DocLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <div className="fixed inset-0 bg-mesh-gradient pointer-events-none" />
      
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-xl border-b border-border-glass z-40 flex items-center px-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
        <span className="ml-3 font-semibold text-foreground">Asto Design System</span>
      </header>

      {/* Desktop: Floating button to re-open sidebar when collapsed */}
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="hidden lg:flex fixed left-4 top-4 z-50 p-2 rounded-lg bg-background/80 backdrop-blur-xl border border-border-glass hover:bg-secondary transition-colors"
          aria-label="Open sidebar"
        >
          <PanelLeft className="w-5 h-5 text-foreground" />
        </button>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main className={`${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-64'} min-h-screen relative pt-14 transition-all duration-300`}>
        <div className="doc-container animate-fade-in max-w-5xl">{children}</div>
      </main>
    </div>
  );
};
