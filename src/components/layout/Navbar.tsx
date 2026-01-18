import { Link, useLocation } from "react-router-dom";
import { Layers2, Wand2, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    // Token Generator has its own nav item, exclude from Design System
    if (path === "/foundations/tokens/builder") {
      return location.pathname === "/foundations/tokens/builder";
    }
    // Design System should be active for all design system pages except Token Builder
    if (path === "/getting-started") {
      const isTokenBuilder = location.pathname === "/foundations/tokens/builder";
      return !isTokenBuilder && (
        location.pathname.startsWith("/getting-started") ||
        location.pathname.startsWith("/foundations") ||
        location.pathname.startsWith("/components")
      );
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: "/", label: "Home", icon: Layers2 },
    { path: "/getting-started", label: "Design System", icon: Layers2 },
    { path: "/foundations/tokens/builder", label: "Token Generator", icon: Wand2 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border-glass">
      <div className="flex items-center h-14 px-4 sm:px-6">
        <Link to="/" className="w-64 text-foreground font-semibold pl-2">
          Asto Design System
        </Link>
          
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center gap-6 flex-1 -ml-64">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isActive(link.path) 
                    ? "text-primary" 
                    : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-background-elevated transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-foreground-secondary" />
              ) : (
                <Moon className="w-4 h-4 text-foreground-secondary" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-background-elevated transition-colors"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border-glass">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 py-2 text-sm transition-colors ${
                  isActive(link.path) 
                    ? "text-primary" 
                    : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
