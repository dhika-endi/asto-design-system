import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { Layers, Settings, Code, BookOpen, AlertTriangle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
}

interface GlossaryCategory {
  name: string;
  icon: LucideIcon;
  terms: GlossaryTerm[];
}

const glossaryData: GlossaryCategory[] = [
  {
    name: "Token Types",
    icon: Layers,
    terms: [
      {
        term: "Primitive Token",
        definition: "Raw, context-free value forming the foundation layer.",
        example: "--gray-900: 0 0% 9%"
      },
      {
        term: "Alias Token",
        definition: "References another token instead of a raw value.",
        example: "--color-primary: var(--blue-500)"
      },
      {
        term: "Semantic Token",
        definition: "Named by purpose, not visual property. Enables theming.",
        example: "--color-error vs --color-red"
      },
      {
        term: "Component Token",
        definition: "Scoped to a specific component for local customization.",
        example: "--button-padding: var(--spacing-4)"
      },
      {
        term: "Global Token",
        definition: "Available system-wide, not scoped to any component.",
        example: "--background, --foreground"
      }
    ]
  },
  {
    name: "Architecture",
    icon: Settings,
    terms: [
      {
        term: "Token Hierarchy",
        definition: "Layered structure from primitives → semantics → components."
      },
      {
        term: "Token Architecture",
        definition: "Organization of naming conventions, hierarchy, and relationships."
      },
      {
        term: "Token Taxonomy",
        definition: "Classification system for organizing tokens into categories."
      },
      {
        term: "Token Naming Convention",
        definition: "Standardized rules following category-property-variant-state pattern."
      }
    ]
  },
  {
    name: "Implementation",
    icon: Code,
    terms: [
      {
        term: "CSS Custom Property",
        definition: "CSS variable defined with -- prefix, accessed via var().",
        example: "var(--primary)"
      },
      {
        term: "HSL",
        definition: "Hue, Saturation, Lightness color model.",
        example: "220 90% 56%"
      },
      {
        term: "Token Value",
        definition: "The actual data stored: color, size, or font name.",
        example: "0 0% 100%"
      },
      {
        term: "Utility Class",
        definition: "Single-property CSS class mapping to token values.",
        example: "bg-primary, text-foreground"
      }
    ]
  },
  {
    name: "Concepts",
    icon: BookOpen,
    terms: [
      {
        term: "Design Token",
        definition: "Named entity storing a visual design attribute. Smallest unit of a design system."
      },
      {
        term: "Theme",
        definition: "Collection of token values defining a complete visual appearance."
      },
      {
        term: "Mode",
        definition: "Theme variant (e.g., light/dark) changing values but keeping names."
      },
      {
        term: "Single Source of Truth",
        definition: "Each design decision defined in exactly one place."
      }
    ]
  },
  {
    name: "Anti-patterns",
    icon: AlertTriangle,
    terms: [
      {
        term: "Hard-coded Value",
        definition: "Raw value used directly instead of a token. Avoid this.",
        example: "#ffffff or 16px"
      }
    ]
  }
];

const TaxonGlossaryPage = () => {
  return (
    <DocLayout>
      <div className="max-w-4xl">
        <PageHeader
          title="Taxon Glossary"
          description="Quick reference for design token terminology."
        />

        <Section>
          <div className="space-y-12 sm:space-y-20">
            {glossaryData.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name}>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border-subtle">
                    <Icon className="w-4 h-4 text-primary" />
                    <h2 className="text-sm font-medium text-foreground uppercase tracking-wide">
                      {category.name}
                    </h2>
                  </div>
                  
                  <dl className="space-y-3">
                    {category.terms.map((item) => (
                      <div 
                        key={item.term}
                        className="grid grid-cols-[140px_1fr] gap-4 py-2 border-b border-border-subtle/50 last:border-0"
                      >
                        <dt className="font-medium text-sm text-foreground">
                          {item.term}
                        </dt>
                        <dd className="text-sm text-foreground-muted">
                          {item.definition}
                          {item.example && (
                            <code className="ml-2 text-xs bg-background-subtle px-1.5 py-0.5 rounded text-primary">
                              {item.example}
                            </code>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </DocLayout>
  );
};

export default TaxonGlossaryPage;
