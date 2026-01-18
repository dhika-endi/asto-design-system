import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Palette, Type, Grid3X3, Layers, Box, Component, 
  Paintbrush, Ruler, Layout, Shapes, Circle, Square, Baseline, AlignCenter,
  Layers2, ArrowRight, Wand2
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";

const designSystemIcons = [
  Palette, Type, Grid3X3, Layers, Box, Component, 
  Paintbrush, Ruler, Layout, Shapes, Circle, Square, Baseline, AlignCenter
];

const quickAccessCards = [
  {
    icon: Palette,
    title: "Color System",
    description: "Primitive and semantic color tokens for consistent theming",
    href: "/foundations/color"
  },
  {
    icon: Type,
    title: "Typography",
    description: "Font families, sizes, and text styles",
    href: "/foundations/typography"
  },
  {
    icon: Box,
    title: "Components",
    description: "Ready-to-use UI components with documentation",
    href: "/components/button"
  },
  {
    icon: Wand2,
    title: "Token Generator",
    description: "Interactive tool to generate consistent token names",
    href: "/foundations/tokens/builder"
  }
];

const DesignSystemLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const gridIcons = useMemo(() => {
    const icons = [];
    for (let i = 0; i < 400; i++) {
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
    <div className="min-h-screen bg-background pt-14">

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />

        {/* Interactive Grid Overlay with Icons */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            maskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          }}
        >
          <div 
            className="w-full h-full grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 60px)',
              gridTemplateRows: 'repeat(auto-fill, 60px)',
            }}
          >
            {gridIcons.map((Icon, index) => (
              <div 
                key={index}
                className="w-[60px] h-[60px] border-[0.5px] border-primary/50 flex items-center justify-center"
              >
                <Icon className="w-4 h-4 text-primary/80" strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>


        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <Layers2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Design System</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 italic">
              Asto Design System
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto mb-10">
              A comprehensive design system for building consistent, accessible, and beautiful user interfaces. Explore foundations, components, and patterns to create exceptional digital experiences.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
              <Link to="/getting-started" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto min-h-[48px]">
                  Explore Design System
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="https://dhikaendi.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="group w-full sm:w-auto min-h-[48px]">
                  About Creator
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Quick Access</h2>
              <p className="text-foreground-secondary text-lg">Jump directly to the sections you need</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickAccessCards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 0.1}>
                <Link
                  to={card.href}
                  className="group block p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <card.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-foreground-secondary text-sm">
                    {card.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemLanding;
