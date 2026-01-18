import { Link, useLocation } from "react-router-dom";
import {
  Layers2,
  Wand2,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Layers,
  Palette,
  Type,
  Grid3X3,
  Square,
  Box,
  Coins,
  BookOpen,
  FileText,
  BookMarked,
  BookA,
  MousePointerClick,
  CheckSquare,
  TextCursorInput,
  Circle,
  ListFilter,
  ToggleLeft,
  AlignLeft,
  Rocket,
  Wrench,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect, createContext, useContext } from "react";

// Navigation item interface
interface NavItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavItem[];
}

// Full mobile navigation structure (same as desktop sidebar)
const mobileNavigation: NavItem[] = [
  {
    label: "Getting Started",
    href: "/getting-started",
    icon: Rocket,
  },
  {
    label: "Foundations",
    icon: Layers,
    children: [
      { label: "Color", href: "/foundations/color", icon: Palette },
      { label: "Typography", href: "/foundations/typography", icon: Type },
      { label: "Spacing", href: "/foundations/spacing", icon: Grid3X3 },
      { label: "Radius", href: "/foundations/radius", icon: Square },
      { label: "Elevation", href: "/foundations/elevation", icon: Layers2 },
    ],
  },
  {
    label: "Tokens",
    icon: Coins,
    children: [
      { label: "Overview", href: "/foundations/tokens/overview", icon: BookOpen },
      { label: "Generator", href: "/foundations/tokens/builder", icon: Wrench },
      { label: "Specifications", href: "/foundations/tokens/specifications", icon: FileText },
      { label: "Usage", href: "/foundations/tokens/usage", icon: BookMarked },
      { label: "Taxon Glossary", href: "/foundations/tokens/glossary", icon: BookA },
    ],
  },
  {
    label: "Components",
    icon: Box,
    children: [
      { label: "Button", href: "/components/button", icon: MousePointerClick },
      { label: "Checkbox", href: "/components/checkbox", icon: CheckSquare },
      { label: "Input", href: "/components/input", icon: TextCursorInput },
      { label: "Radio Button", href: "/components/radio", icon: Circle },
      { label: "Select", href: "/components/select", icon: ListFilter },
      { label: "Switch", href: "/components/switch", icon: ToggleLeft },
      { label: "Textarea", href: "/components/textarea", icon: AlignLeft },
    ],
  },
];

// Context to share mobile menu state
interface MobileMenuContextType {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MobileMenuContext = createContext<MobileMenuContextType>({
  mobileMenuOpen: false,
  setMobileMenuOpen: () => {},
});

export const useMobileMenu = () => useContext(MobileMenuContext);

// Mobile navigation section component
interface MobileNavSectionProps {
  item: NavItem;
  onLinkClick: () => void;
  pathname: string;
}

const MobileNavSection = ({ item, onLinkClick, pathname }: MobileNavSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname;
  const Icon = item.icon;

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 text-xs font-medium uppercase tracking-wider text-foreground-muted hover:text-foreground transition-colors min-h-[48px]"
        >
          <span className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5" />}
            {item.label}
          </span>
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {isOpen && (
          <div className="ml-4 border-l border-border-subtle">
            {item.children?.map((child) => (
              <MobileNavSection
                key={child.label}
                item={child}
                onLinkClick={onLinkClick}
                pathname={pathname}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href || "/"}
      onClick={onLinkClick}
      className={`flex items-center gap-3 py-3 px-4 ml-2 rounded-lg transition-colors min-h-[48px] ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground-secondary hover:text-foreground hover:bg-background-elevated"
      }`}
    >
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      <span className="font-medium text-sm">{item.label}</span>
    </Link>
  );
};

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/foundations/tokens/builder") {
      return location.pathname === "/foundations/tokens/builder";
    }
    if (path === "/getting-started") {
      const isTokenBuilder = location.pathname === "/foundations/tokens/builder";
      return (
        !isTokenBuilder &&
        (location.pathname.startsWith("/getting-started") ||
          location.pathname.startsWith("/foundations") ||
          location.pathname.startsWith("/components"))
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
    <MobileMenuContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border-glass">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 w-full max-w-full">
          {/* Logo */}
          <Link
            to="/"
            className="text-foreground font-semibold text-sm sm:text-base shrink-0"
          >
            Asto Design System
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-sm transition-colors whitespace-nowrap ${
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

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 sm:p-2 rounded-lg hover:bg-background-elevated transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 sm:w-4 sm:h-4 text-foreground-secondary" />
              ) : (
                <Moon className="w-5 h-5 sm:w-4 sm:h-4 text-foreground-secondary" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-lg hover:bg-background-elevated transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-opacity duration-300 ease-out ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        />

        {/* Sidebar Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-[280px] max-w-[80vw] bg-background-surface border-r border-border-glass shadow-2xl transition-transform duration-300 ease-out overflow-hidden flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ zIndex: 1000 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between h-14 px-4 border-b border-border-glass shrink-0">
            <span className="font-semibold text-foreground">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-background-elevated transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Main Navigation Links */}
          <div className="px-4 py-3 border-b border-border-subtle shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors min-h-[48px] ${
                  isActive(link.path)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-foreground-secondary hover:text-foreground hover:bg-background-elevated"
                }`}
              >
                <link.icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Full Navigation - Scrollable */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin p-2">
            {mobileNavigation.map((item) => (
              <MobileNavSection
                key={item.label}
                item={item}
                onLinkClick={() => setMobileMenuOpen(false)}
                pathname={location.pathname}
              />
            ))}
          </nav>
        </div>
      </div>
    </MobileMenuContext.Provider>
  );
};
