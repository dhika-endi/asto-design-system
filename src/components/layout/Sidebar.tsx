import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  ChevronRight, 
  Home,
  Layers,
  Palette,
  Type,
  Grid3X3,
  Square,
  Layers2,
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
  Settings,
  Wrench
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavItem[];
}

const navigation: NavItem[] = [
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

interface NavSectionProps {
  item: NavItem;
  level?: number;
  onLinkClick?: () => void;
}

const NavSection = ({ item, level = 0, onLinkClick }: NavSectionProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === location.pathname;
  const Icon = item.icon;

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium uppercase tracking-wider text-foreground-muted hover:text-foreground transition-colors"
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            {item.label}
          </span>
          {isOpen ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </button>
        {isOpen && (
          <div className="ml-2 border-l border-border-subtle">
            {item.children.map((child) => (
              <NavSection key={child.label} item={child} level={level + 1} onLinkClick={onLinkClick} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href || "/design-system"}
      onClick={onLinkClick}
      className={`nav-link ml-2 flex items-center gap-2 ${isActive ? "nav-link-active" : ""}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {item.label}
    </Link>
  );
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onCollapse?: () => void;
}

export const Sidebar = ({ isOpen, onClose, isCollapsed, onCollapse }: SidebarProps) => {
  return (
    <aside 
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 glass-sidebar overflow-y-auto z-40 transition-transform duration-300 scrollbar-thin lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <NavSection key={item.label} item={item} onLinkClick={onClose} />
        ))}
      </nav>
    </aside>
  );
};
