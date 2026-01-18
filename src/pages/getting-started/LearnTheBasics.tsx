import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Layers, 
  Accessibility, 
  Palette, 
  Box,
  Sun,
  Moon
} from "lucide-react";

const concepts = [
  {
    title: "Design Tokens",
    description: "Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values to ensure flexibility and maintain a scalable system.",
    icon: Layers,
    examples: [
      { label: "Colors", value: "--primary: 220 70% 50%" },
      { label: "Spacing", value: "--spacing-4: 1rem" },
      { label: "Typography", value: "--font-size-lg: 1.125rem" },
    ],
    link: {
      href: "/design-system/foundations/tokens/overview",
      label: "Explore Tokens",
    },
  },
  {
    title: "Component Anatomy",
    description: "Every component in the design system follows a consistent structure with defined parts, states, and variants. Understanding this anatomy helps you use components correctly and customize them when needed.",
    icon: Box,
    parts: [
      { label: "Container", description: "The wrapper element that holds all parts" },
      { label: "Content", description: "The main interactive or display area" },
      { label: "Label", description: "Descriptive text for the component" },
      { label: "Icon", description: "Optional visual indicator" },
    ],
    link: {
      href: "/design-system/components/button",
      label: "View Button Anatomy",
    },
  },
  {
    title: "Accessibility",
    description: "Accessibility is built into every component. We follow WCAG 2.1 AA guidelines to ensure our design system is usable by everyone, including people with disabilities.",
    icon: Accessibility,
    principles: [
      "Sufficient color contrast ratios (4.5:1 for text)",
      "Keyboard navigation support",
      "Screen reader compatibility with ARIA labels",
      "Focus indicators for interactive elements",
    ],
  },
];

const LearnTheBasics = () => {
  return (
    <DocLayout>
      <PageHeader
        title="Learn the Basics"
        description="Understand the core concepts and principles that power Asto Design System. These fundamentals will help you use the system effectively and create consistent experiences."
      />

      {concepts.map((concept) => (
        <Section key={concept.title} title={concept.title}>
          <div className="p-6 bg-background-elevated rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <concept.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-medium text-foreground">{concept.title}</h3>
            </div>
            <p className="text-sm text-foreground-secondary mb-4">
              {concept.description}
            </p>

            {concept.examples && (
              <div className="space-y-2 mb-4">
                {concept.examples.map((example) => (
                  <div key={example.label} className="flex items-center gap-4 p-3 bg-background-surface rounded-lg">
                    <span className="text-sm font-medium text-foreground w-24">{example.label}</span>
                    <code className="text-xs text-foreground-muted font-mono">{example.value}</code>
                  </div>
                ))}
              </div>
            )}

            {concept.parts && (
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {concept.parts.map((part) => (
                  <div key={part.label} className="p-3 bg-background-surface rounded-lg">
                    <span className="text-sm font-medium text-foreground">{part.label}</span>
                    <p className="text-xs text-foreground-muted mt-1">{part.description}</p>
                  </div>
                ))}
              </div>
            )}

            {concept.principles && (
              <ul className="space-y-2 mb-4">
                {concept.principles.map((principle) => (
                  <li key={principle} className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {principle}
                  </li>
                ))}
              </ul>
            )}

            {concept.link && (
              <Link
                to={concept.link.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {concept.link.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </Section>
      ))}

      <Section title="Theming">
        <div className="p-6 bg-background-elevated rounded-lg border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-base font-medium text-foreground">Theme Customization</h3>
          </div>
          <p className="text-sm text-foreground-secondary mb-4">
            The design system supports theming through CSS custom properties. You can customize the entire look and feel by overriding token values.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-background-surface rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-4 h-4 text-foreground-muted" />
                <span className="text-sm font-medium text-foreground">Dark Theme (Default)</span>
              </div>
              <p className="text-xs text-foreground-muted">
                Optimized for low-light environments with high contrast and reduced eye strain.
              </p>
            </div>
            <div className="p-4 bg-background-surface rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-4 h-4 text-foreground-muted" />
                <span className="text-sm font-medium text-foreground">Light Theme</span>
              </div>
              <p className="text-xs text-foreground-muted">
                Can be enabled by swapping token values in the CSS variables.
              </p>
            </div>
          </div>

          <Link
            to="/design-system/foundations/color"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Explore Color System
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      <Section title="Next Steps">
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/design-system/getting-started/status"
            className="group p-5 bg-background-elevated rounded-lg border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-medium text-foreground">Component Status</h3>
              <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-foreground-muted">
              Check the maturity level of each component before implementation.
            </p>
          </Link>
          <Link
            to="/design-system/foundations/color"
            className="group p-5 bg-background-elevated rounded-lg border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-medium text-foreground">Start with Foundations</h3>
              <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-foreground-muted">
              Deep dive into colors, typography, spacing, and other foundational elements.
            </p>
          </Link>
        </div>
      </Section>
    </DocLayout>
  );
};

export default LearnTheBasics;
