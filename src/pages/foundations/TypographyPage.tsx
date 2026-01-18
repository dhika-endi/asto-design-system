import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { TokenTable } from "@/components/docs/TokenTable";
import { DosDonts } from "@/components/docs/DosDonts";

const fontFamilies = [
  { name: "--font-sans", value: "Inter, system-ui, sans-serif", description: "Body text, UI elements" },
  { name: "--font-mono", value: "JetBrains Mono, monospace", description: "Code, technical content" },
];

const typeScale = [
  { name: "--text-xs", value: "0.75rem / 12px", description: "Captions, labels" },
  { name: "--text-sm", value: "0.875rem / 14px", description: "Secondary text, buttons" },
  { name: "--text-base", value: "1rem / 16px", description: "Body text default" },
  { name: "--text-lg", value: "1.125rem / 18px", description: "Lead paragraphs" },
  { name: "--text-xl", value: "1.25rem / 20px", description: "Section headings (H4)" },
  { name: "--text-2xl", value: "1.5rem / 24px", description: "Page headings (H3)" },
  { name: "--text-3xl", value: "1.875rem / 30px", description: "Major headings (H2)" },
  { name: "--text-4xl", value: "2.25rem / 36px", description: "Page titles (H1)" },
  { name: "--text-5xl", value: "3rem / 48px", description: "Hero headings" },
];

const fontWeights = [
  { name: "--font-light", value: "300", description: "Decorative text only" },
  { name: "--font-normal", value: "400", description: "Body text default" },
  { name: "--font-medium", value: "500", description: "Emphasis, labels" },
  { name: "--font-semibold", value: "600", description: "Headings, buttons" },
  { name: "--font-bold", value: "700", description: "Strong emphasis" },
];

const lineHeights = [
  { name: "--leading-none", value: "1", description: "Single line text only" },
  { name: "--leading-tight", value: "1.25", description: "Headings" },
  { name: "--leading-snug", value: "1.375", description: "Compact paragraphs" },
  { name: "--leading-normal", value: "1.5", description: "Body text default" },
  { name: "--leading-relaxed", value: "1.625", description: "Long-form content" },
];

const TypographyPage = () => {
  return (
    <DocLayout>
      <PageHeader
        category="Foundations"
        title="Typography"
        description="Typography creates hierarchy and guides reading flow. A consistent type system ensures readability and visual harmony across all interfaces."
      />

      <Section
        title="Font families"
        description="Two font families serve distinct purposes: a sans-serif for interface text and a monospace for code."
      >
        <TokenTable tokens={fontFamilies} />
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-background-elevated rounded-lg border border-border">
            <p className="text-2xl font-sans text-foreground mb-2">Inter</p>
            <p className="text-foreground-secondary">
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
          </div>
          <div className="p-6 bg-background-elevated rounded-lg border border-border">
            <p className="text-2xl font-mono text-foreground mb-2">JetBrains Mono</p>
            <p className="font-mono text-foreground-secondary">
              const value = 42; // Code example
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Type scale"
        description="A modular scale provides consistent sizing. Each step serves a specific hierarchy level."
      >
        <TokenTable tokens={typeScale} />
        <div className="mt-6 space-y-4 p-6 bg-background-elevated rounded-lg border border-border">
          <p className="text-5xl font-semibold text-foreground">Hero heading</p>
          <p className="text-4xl font-semibold text-foreground">Page title (H1)</p>
          <p className="text-3xl font-semibold text-foreground">Major heading (H2)</p>
          <p className="text-2xl font-semibold text-foreground">Section heading (H3)</p>
          <p className="text-xl font-medium text-foreground">Subsection (H4)</p>
          <p className="text-lg text-foreground-secondary">Lead paragraph</p>
          <p className="text-base text-foreground-secondary">Body text default</p>
          <p className="text-sm text-foreground-muted">Secondary text</p>
          <p className="text-xs text-foreground-muted">Caption text</p>
        </div>
      </Section>

      <Section
        title="Font weights"
        description="Weight variations create emphasis within the same size. Use sparingly to maintain hierarchy."
      >
        <TokenTable tokens={fontWeights} />
      </Section>

      <Section
        title="Line height"
        description="Line height affects readability. Tighter leading for headings, relaxed for body text."
      >
        <TokenTable tokens={lineHeights} />
      </Section>

      <Section title="Usage guidelines">
        <DosDonts
          dos={[
            "Use the type scale consistently across all pages",
            "Pair headings with appropriate line heights",
            "Reserve bold weights for key information only",
            "Ensure sufficient contrast for all text sizes",
          ]}
          donts={[
            "Create custom font sizes outside the scale",
            "Use more than 2-3 font weights on a single page",
            "Set body text smaller than 14px (--text-sm)",
            "Mix font families within the same sentence",
          ]}
        />
      </Section>
    </DocLayout>
  );
};

export default TypographyPage;
