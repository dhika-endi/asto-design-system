import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { Layers, Palette, RefreshCw, Zap } from "lucide-react";

const TokenOverviewPage = () => {
  return (
    <DocLayout>
      <div className="max-w-4xl">
        <PageHeader
          title="Tokens Overview"
          description="Design tokens are the foundational building blocks of our design system, serving as the single source of truth for design decisions."
        />

        <Section title="What are Design Tokens?">
          <p className="text-foreground-muted mb-6">
            Design tokens are named entities that store visual design attributes. They replace static values like hex colors or pixel measurements with semantic, reusable variables that can be applied consistently across platforms and products.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">Abstraction Layer</h3>
              </div>
              <p className="text-sm text-foreground-muted">
                Tokens abstract raw values into meaningful names, making design decisions portable and maintainable.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">Visual Consistency</h3>
              </div>
              <p className="text-sm text-foreground-muted">
                By using tokens, we ensure visual consistency across all components and screens in the system.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">Easy Updates</h3>
              </div>
              <p className="text-sm text-foreground-muted">
                Change a token value once and it propagates everywhere, making global updates effortless.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">Scalability</h3>
              </div>
              <p className="text-sm text-foreground-muted">
                Tokens scale with your product, supporting theming, multi-brand, and platform-specific needs.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Token Categories">
          <p className="text-foreground-muted mb-6">
            Our design tokens are organized into distinct categories, each serving a specific purpose in the design system.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Color Tokens</h4>
              <p className="text-sm text-foreground-muted mb-3">
                Define the color palette including primary, secondary, semantic colors, and their variations.
              </p>
              <code className="text-xs bg-background px-2 py-1 rounded border border-border-subtle text-primary">
                --primary, --background, --foreground-muted
              </code>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Typography Tokens</h4>
              <p className="text-sm text-foreground-muted mb-3">
                Control font families, sizes, weights, line heights, and letter spacing.
              </p>
              <code className="text-xs bg-background px-2 py-1 rounded border border-border-subtle text-primary">
                --font-sans, --font-mono, text-sm, font-medium
              </code>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Spacing Tokens</h4>
              <p className="text-sm text-foreground-muted mb-3">
                Define consistent spacing values for margins, paddings, and gaps.
              </p>
              <code className="text-xs bg-background px-2 py-1 rounded border border-border-subtle text-primary">
                spacing-1, spacing-2, spacing-4, spacing-8
              </code>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Radius Tokens</h4>
              <p className="text-sm text-foreground-muted mb-3">
                Control border radius values for consistent corner rounding.
              </p>
              <code className="text-xs bg-background px-2 py-1 rounded border border-border-subtle text-primary">
                --radius-sm, --radius-md, --radius-lg
              </code>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Elevation Tokens</h4>
              <p className="text-sm text-foreground-muted mb-3">
                Define shadow and depth values for visual hierarchy.
              </p>
              <code className="text-xs bg-background px-2 py-1 rounded border border-border-subtle text-primary">
                --shadow-sm, --shadow-md, --shadow-lg
              </code>
            </div>
          </div>
        </Section>

        <Section title="Why Use Tokens?">
          <div className="prose prose-invert max-w-none">
            <ul className="space-y-3 text-foreground-muted">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong className="text-foreground">Single Source of Truth:</strong> All design decisions are centralized, reducing inconsistencies.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong className="text-foreground">Platform Agnostic:</strong> Tokens can be transformed to work on web, iOS, Android, and more.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong className="text-foreground">Theme Support:</strong> Easily implement dark mode, brand themes, or accessibility modes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong className="text-foreground">Designer-Developer Alignment:</strong> Shared vocabulary improves collaboration and handoff.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong className="text-foreground">Automation Ready:</strong> Tokens integrate with design tools and build pipelines for automated workflows.</span>
              </li>
            </ul>
          </div>
        </Section>
      </div>
    </DocLayout>
  );
};

export default TokenOverviewPage;
