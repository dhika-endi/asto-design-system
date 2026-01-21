import { DocLayout } from "@/components/layout/DocLayout";
import { Section } from "@/components/docs/Section";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { 
  Palette, Type, Box, Wand2, ArrowRight, Users, Code, Paintbrush,
  Grid3X3, Layers, Component, Ruler, Layout, Shapes, Circle, Square, Baseline, AlignCenter
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const designSystemIcons = [
  Palette, Type, Grid3X3, Layers, Box, Component, 
  Paintbrush, Ruler, Layout, Shapes, Circle, Square, Baseline, AlignCenter
];

const quickLinks = [
  {
    title: "Color",
    description: "Explore our color system with primitive and semantic tokens",
    href: "/foundations/color",
    icon: Palette,
  },
  {
    title: "Typography",
    description: "Font families, sizes, and text styles",
    href: "/foundations/typography",
    icon: Type,
  },
  {
    title: "Components",
    description: "Ready-to-use UI components",
    href: "/components/button",
    icon: Box,
  },
  {
    title: "Token Builder",
    description: "Interactive tool to generate consistent token names",
    href: "/foundations/tokens/builder",
    icon: Wand2,
  },
];

const audienceCards = [
  {
    title: "Designers",
    description: "Access design tokens, color palettes, and component specifications to create consistent designs.",
    icon: Paintbrush,
  },
  {
    title: "Developers",
    description:
      "See how the design system is structured to enable clear handoff, consistency, and predictable implementation.",
    icon: Code,
  },
  {
    title: "Product Teams",
    description: "Understand design principles and patterns to make informed product decisions.",
    icon: Users,
  },
];

const GettingStartedHome = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const gridIcons = useMemo(() => {
    const icons = [];
    for (let i = 0; i < 300; i++) {
      icons.push(designSystemIcons[i % designSystemIcons.length]);
    }
    return icons;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <DocLayout>
      {/* Hero Section with Interactive Grid */}
      <section 
        className="relative mb-10 pb-6 border-b border-border-subtle"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Interactive Grid Overlay with Icons */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 overflow-hidden rounded-lg"
          style={{
            opacity: isHovering ? 1 : 0,
            maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          }}
        >
          <div 
            className="w-full h-full grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 50px)',
              gridTemplateRows: 'repeat(auto-fill, 50px)',
            }}
          >
            {gridIcons.map((Icon, index) => (
              <div 
                key={index}
                className="w-[50px] h-[50px] border-[0.5px] border-primary/50 flex items-center justify-center"
              >
                <Icon className="w-3 h-3 text-primary/80" strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>

        {/* Header Content */}
        <div className="relative z-10">
          <ScrollReveal>
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
              Getting Started
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-foreground-secondary max-w-2xl">
              Welcome to Asto Design System — a comprehensive design system for building consistent, accessible, and beautiful user interfaces. Explore our foundations, components, and patterns to create exceptional digital experiences.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Section title="Who Is This For?">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audienceCards.map((card) => (
            <div key={card.title} className="p-5 bg-surface-elevated rounded-lg border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-1">{card.title}</h3>
              <p className="text-sm text-foreground-muted">{card.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="How to Use This Documentation">
        <div className="p-4 sm:p-6 bg-surface-elevated rounded-lg border border-border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">1. Start with Foundations</h4>
              <p className="text-sm text-foreground-muted">
                Learn about colors, typography, spacing, and other core design tokens that form the building blocks of
                the system.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">2. Explore Components</h4>
              <p className="text-sm text-foreground-muted">
                Browse our component library to find reusable UI elements with usage guidelines and code examples.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">3. Use the Token Builder</h4>
              <p className="text-sm text-foreground-muted">
                Generate consistent token names using our interactive tool to maintain naming conventions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">4. Understand Design Decisions</h4>
              <p className="text-sm text-foreground-muted">
                Review the rationale behind tokens, components, and rules to understand how consistency, accessibility,
                and scalability are achieved across the system.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Quick Links">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="group p-4 sm:p-5 bg-surface-elevated rounded-lg border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-1">{link.title}</h3>
              <p className="text-sm text-foreground-muted">{link.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Next Steps">
        <div className="p-4 sm:p-6 bg-surface-elevated rounded-lg border border-border">
          <h3 className="text-lg font-medium text-foreground mb-2">Ready to dive in?</h3>
          <p className="text-sm text-foreground-secondary mb-4">
            Set up your development environment and learn the core concepts to start building with Asto Design System.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/getting-started/setup"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              Setup Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/getting-started/learn"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-surface-elevated text-foreground rounded-lg text-sm font-medium border border-border hover:bg-surface-elevated transition-colors min-h-[44px]"
            >
              Learn the Basics
            </Link>
          </div>
        </div>
      </Section>

      <footer className="pt-8 mt-8 border-t border-border-subtle">
        <p className="text-sm text-foreground-muted">Asto Design System</p>
      </footer>
    </DocLayout>
  );
};

export default GettingStartedHome;
