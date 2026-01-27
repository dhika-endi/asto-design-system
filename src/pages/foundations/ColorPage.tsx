import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { TokenTable } from "@/components/docs/TokenTable";
import { DosDonts } from "@/components/docs/DosDonts";
import { DocTabs } from "@/components/docs/DocTabs";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const primitiveNeutrals = [
  { name: "--neutral-950", value: "#0a0a0a" },
  { name: "--neutral-900", value: "#121212" },
  { name: "--neutral-800", value: "#1a1a1a" },
  { name: "--neutral-700", value: "#242424" },
  { name: "--neutral-600", value: "#404040" },
  { name: "--neutral-500", value: "#737373" },
  { name: "--neutral-400", value: "#a3a3a3" },
  { name: "--neutral-300", value: "#d4d4d4" },
  { name: "--neutral-200", value: "#e5e5e5" },
  { name: "--neutral-100", value: "#f5f5f5" },
  { name: "--neutral-50", value: "#fafafa" },
];

const primitiveOrange = [
  { name: "--orange-900", value: "#7c2d12" },
  { name: "--orange-800", value: "#9a3412" },
  { name: "--orange-700", value: "#c2410c" },
  { name: "--orange-600", value: "#d9480f" },
  { name: "--orange-500", value: "#ea580c" },
  { name: "--orange-400", value: "#f97316" },
  { name: "--orange-300", value: "#fb923c" },
  { name: "--orange-200", value: "#fdba74" },
  { name: "--orange-100", value: "#ffedd5" },
  { name: "--orange-50", value: "#fff7ed" },
];

const primitiveRed = [
  { name: "--red-900", value: "#7f1d1d" },
  { name: "--red-800", value: "#991b1b" },
  { name: "--red-700", value: "#b91c1c" },
  { name: "--red-600", value: "#dc2626" },
  { name: "--red-500", value: "#ef4444" },
  { name: "--red-400", value: "#f87171" },
  { name: "--red-300", value: "#fca5a5" },
  { name: "--red-200", value: "#fecaca" },
  { name: "--red-100", value: "#fee2e2" },
  { name: "--red-50", value: "#fef2f2" },
];

const primitiveYellow = [
  { name: "--yellow-900", value: "#713f12" },
  { name: "--yellow-800", value: "#854d0e" },
  { name: "--yellow-700", value: "#a16207" },
  { name: "--yellow-600", value: "#ca8a04" },
  { name: "--yellow-500", value: "#eab308" },
  { name: "--yellow-400", value: "#facc15" },
  { name: "--yellow-300", value: "#fde047" },
  { name: "--yellow-200", value: "#fef08a" },
  { name: "--yellow-100", value: "#fef9c3" },
  { name: "--yellow-50", value: "#fefce8" },
];

const primitiveGreen = [
  { name: "--green-900", value: "#14532d" },
  { name: "--green-800", value: "#166534" },
  { name: "--green-700", value: "#15803d" },
  { name: "--green-600", value: "#16a34a" },
  { name: "--green-500", value: "#22c55e" },
  { name: "--green-400", value: "#4ade80" },
  { name: "--green-300", value: "#86efac" },
  { name: "--green-200", value: "#bbf7d0" },
  { name: "--green-100", value: "#dcfce7" },
  { name: "--green-50", value: "#f0fdf4" },
];

const semanticText = [
  { name: "--text-primary", value: "#fafafa", primitiveToken: "neutral-50", description: "Main body text, headings" },
  { name: "--text-secondary", value: "#a6a6a6", primitiveToken: "neutral-300", description: "Supporting text, descriptions" },
  { name: "--text-muted", value: "#737373", primitiveToken: "neutral-400", description: "Placeholders, captions" },
  { name: "--text-disabled", value: "#4d4d4d", primitiveToken: "neutral-500", description: "Disabled states only" },
  { name: "--text-inverse", value: "#0a0a0a", primitiveToken: "neutral-950", description: "Text on light backgrounds" },
  { name: "--text-brand", value: "#ea580c", primitiveToken: "orange-600", description: "Brand accent text, links, emphasis" },
];

const semanticBackground = [
  { name: "--background-default", value: "#0a0a0a", primitiveToken: "neutral-950", description: "Main page background, body" },
  { name: "--background-subtle", value: "#121212", primitiveToken: "neutral-900", description: "Hero sections, footer, alternate sections" },
  { name: "--background-muted", value: "#1a1a1a", primitiveToken: "neutral-800", description: "Emphasized sections, code blocks" },
];

const semanticSurface = [
  { name: "--surface-default", value: "#121212", primitiveToken: "neutral-900", description: "Sidebar, navigation, base components" },
  { name: "--surface-elevated", value: "#1a1a1a", primitiveToken: "neutral-800", description: "Cards, panels, elevated components" },
  { name: "--surface-overlay", value: "#262626", primitiveToken: "neutral-700", description: "Modals, dropdowns, tooltips" },
  { name: "--surface-brand", value: "#ea580c", primitiveToken: "orange-600", description: "Primary buttons, brand highlights" },
  { name: "--surface-brand-muted", value: "rgba(234, 88, 12, 0.15)", primitiveToken: "orange-600 @ 15%", description: "Brand accent backgrounds" },
];

const semanticStroke = [
  { name: "--stroke-default", value: "#292929", primitiveToken: "neutral-700", description: "Component borders" },
  { name: "--stroke-subtle", value: "#1f1f1f", primitiveToken: "custom", description: "Dividers, separators" },
  { name: "--stroke-strong", value: "#404040", primitiveToken: "neutral-600", description: "Focus rings, emphasis" },
  { name: "--stroke-brand", value: "#ea580c", primitiveToken: "orange-600", description: "Active states, brand borders" },
];

const semanticStates = [
  { name: "--success", value: "#22c55e", primitiveToken: "green-500", description: "Positive actions, confirmations" },
  { name: "--success-muted", value: "rgba(34, 197, 94, 0.15)", primitiveToken: "green-500 @ 15%", description: "Success backgrounds" },
  { name: "--success-border", value: "rgba(34, 197, 94, 0.3)", primitiveToken: "green-500 @ 30%", description: "Success borders" },
  { name: "--warning", value: "#eab308", primitiveToken: "yellow-500", description: "Caution, attention needed" },
  { name: "--warning-muted", value: "rgba(234, 179, 8, 0.15)", primitiveToken: "yellow-500 @ 15%", description: "Warning backgrounds" },
  { name: "--warning-border", value: "rgba(234, 179, 8, 0.3)", primitiveToken: "yellow-500 @ 30%", description: "Warning borders" },
  { name: "--error", value: "#ef4444", primitiveToken: "red-500", description: "Errors, destructive actions" },
  { name: "--error-muted", value: "rgba(239, 68, 68, 0.15)", primitiveToken: "red-500 @ 15%", description: "Error backgrounds" },
  { name: "--error-border", value: "rgba(239, 68, 68, 0.3)", primitiveToken: "red-500 @ 30%", description: "Error borders" },
  { name: "--info", value: "#3b82f6", primitiveToken: "blue-500", description: "Informational messages" },
  { name: "--info-muted", value: "rgba(59, 130, 246, 0.15)", primitiveToken: "blue-500 @ 15%", description: "Info backgrounds" },
  { name: "--info-border", value: "rgba(59, 130, 246, 0.3)", primitiveToken: "blue-500 @ 30%", description: "Info borders" },
];

const StatePreview = () => (
  <div className="grid md:grid-cols-2 gap-4 mb-6">
    <div className="p-4 rounded-xl border bg-[rgba(34,197,94,0.15)] border-[rgba(34,197,94,0.3)]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="font-medium text-success">Success</span>
      </div>
      <p className="text-sm text-foreground-secondary">Operation completed successfully</p>
    </div>
    <div className="p-4 rounded-xl border bg-[rgba(234,179,8,0.15)] border-[rgba(234,179,8,0.3)]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-warning" />
        <span className="font-medium text-warning">Warning</span>
      </div>
      <p className="text-sm text-foreground-secondary">This action requires attention</p>
    </div>
    <div className="p-4 rounded-xl border bg-[rgba(239,68,68,0.15)] border-[rgba(239,68,68,0.3)]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-error" />
        <span className="font-medium text-error">Error</span>
      </div>
      <p className="text-sm text-foreground-secondary">Something went wrong</p>
    </div>
    <div className="p-4 rounded-xl border bg-[rgba(59,130,246,0.15)] border-[rgba(59,130,246,0.3)]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-info" />
        <span className="font-medium text-info">Info</span>
      </div>
      <p className="text-sm text-foreground-secondary">Here is some helpful information</p>
    </div>
  </div>
);

const PrimitiveColors = () => (
  <div className="space-y-12">
    <Section
      title="Neutral scale"
      description="The foundation of the color system. Used for backgrounds, text, and borders."
    >
      <div className="flex gap-1 mb-4">
        {primitiveNeutrals.map((color) => (
          <div
            key={color.name}
            className="flex-1 aspect-square rounded-lg border border-border-glass"
            style={{ backgroundColor: color.value }}
            title={`${color.name}: ${color.value}`}
          />
        ))}
      </div>
      <TokenTable tokens={primitiveNeutrals} showSwatch />
    </Section>

    <Section
      title="Orange scale"
      description="The primary accent color. Used for interactive elements, CTAs, and brand emphasis."
    >
      <div className="flex gap-1 mb-4">
        {primitiveOrange.map((color) => (
          <div
            key={color.name}
            className="flex-1 aspect-square rounded-lg border border-border-glass"
            style={{ backgroundColor: color.value }}
            title={`${color.name}: ${color.value}`}
          />
        ))}
      </div>
      <TokenTable tokens={primitiveOrange} showSwatch />
    </Section>

    <Section
      title="Red scale"
      description="Used for error states, destructive actions, and critical alerts."
    >
      <div className="flex gap-1 mb-4">
        {primitiveRed.map((color) => (
          <div
            key={color.name}
            className="flex-1 aspect-square rounded-lg border border-border-glass"
            style={{ backgroundColor: color.value }}
            title={`${color.name}: ${color.value}`}
          />
        ))}
      </div>
      <TokenTable tokens={primitiveRed} showSwatch />
    </Section>

    <Section
      title="Yellow scale"
      description="Used for warning states, caution indicators, and attention-grabbing elements."
    >
      <div className="flex gap-1 mb-4">
        {primitiveYellow.map((color) => (
          <div
            key={color.name}
            className="flex-1 aspect-square rounded-lg border border-border-glass"
            style={{ backgroundColor: color.value }}
            title={`${color.name}: ${color.value}`}
          />
        ))}
      </div>
      <TokenTable tokens={primitiveYellow} showSwatch />
    </Section>

    <Section
      title="Green scale"
      description="Used for success states, positive actions, and confirmation messages."
    >
      <div className="flex gap-1 mb-4">
        {primitiveGreen.map((color) => (
          <div
            key={color.name}
            className="flex-1 aspect-square rounded-lg border border-border-glass"
            style={{ backgroundColor: color.value }}
            title={`${color.name}: ${color.value}`}
          />
        ))}
      </div>
      <TokenTable tokens={primitiveGreen} showSwatch />
    </Section>
  </div>
);

const SemanticColors = () => (
  <div className="space-y-12">
    <Section
      title="Text"
      description="Text colors establish hierarchy and guide reading flow. Use primary for main content, secondary for supporting information."
    >
      <TokenTable tokens={semanticText} showSwatch />
    </Section>

    <Section
      title="Background"
      description="Background colors define page and section level backgrounds. Use these for the foundational canvas of your interface."
    >
      <TokenTable tokens={semanticBackground} showSwatch />
    </Section>

    <Section
      title="Surface"
      description="Surface colors create depth and spatial hierarchy for components. Layered surfaces help users understand UI structure at the component level."
    >
      <TokenTable tokens={semanticSurface} showSwatch />
    </Section>

    <Section
      title="Stroke"
      description="Stroke colors define boundaries and separation between elements. Use sparingly to maintain visual clarity."
    >
      <TokenTable tokens={semanticStroke} showSwatch />
    </Section>

    <Section
      title="State colors"
      description="State colors communicate feedback, status, and system conditions. Each state includes a base color, muted background, and border variant."
    >
      <StatePreview />
      <TokenTable tokens={semanticStates} showSwatch />
    </Section>

    <Section title="Usage guidelines">
      <DosDonts
        dos={[
          "Use semantic tokens for all interface elements",
          "Use background tokens for page/section level (body, sections, code blocks)",
          "Use surface tokens for components (sidebar, cards, modals)",
          "Maintain consistent contrast ratios for accessibility",
          "Layer surfaces from dark to light to create depth",
        ]}
        donts={[
          "Use primitive colors directly in components",
          "Use surface tokens for page backgrounds (use background tokens)",
          "Use background tokens for components (use surface tokens)",
          "Mix semantic contexts (text color for backgrounds)",
          "Use color as the only indicator of state or meaning",
        ]}
      />
    </Section>
  </div>
);

// Component color tokens - mapped to actual CSS variables used by each component

const buttonTokens = [
  { name: "--primary", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Default variant background (bg-primary)" },
  { name: "--primary-foreground", value: "hsl(0 0% 100%)", primitiveToken: "white", description: "Default variant text color" },
  { name: "--primary-hover", value: "hsl(14 80% 48%)", primitiveToken: "orange-600", description: "Default variant hover (bg-primary/90)" },
  { name: "--destructive", value: "hsl(0 72% 51%)", primitiveToken: "red-500", description: "Destructive variant background" },
  { name: "--destructive-foreground", value: "hsl(0 0% 98%)", primitiveToken: "neutral-50", description: "Destructive variant text" },
  { name: "--error", value: "hsl(0 72% 51%)", primitiveToken: "red-500", description: "Danger variant text and hover border" },
  { name: "--secondary", value: "hsl(0 0% 12%)", primitiveToken: "neutral-900", description: "Secondary/outline hover background" },
  { name: "--secondary-foreground", value: "hsl(0 0% 85%)", primitiveToken: "neutral-200", description: "Secondary variant text" },
  { name: "--border-glass", value: "hsl(0 0% 20%)", primitiveToken: "neutral-700", description: "Outline variant border" },
  { name: "--border-strong", value: "hsl(0 0% 25%)", primitiveToken: "neutral-600", description: "Outline hover border" },
  { name: "--foreground-secondary", value: "hsl(0 0% 65%)", primitiveToken: "neutral-400", description: "Tertiary variant text" },
  { name: "--ring", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Focus ring color" },
];

const inputTokens = [
  { name: "--background", value: "hsl(0 0% 4%)", primitiveToken: "neutral-950", description: "Input background (bg-background)" },
  { name: "--input", value: "hsl(0 0% 12%)", primitiveToken: "neutral-900", description: "Input border color (border-input)" },
  { name: "--foreground", value: "hsl(0 0% 98%)", primitiveToken: "neutral-50", description: "Input text color" },
  { name: "--muted-foreground", value: "hsl(0 0% 50%)", primitiveToken: "neutral-500", description: "Placeholder text color" },
  { name: "--foreground/20", value: "hsla(0 0% 98% / 0.2)", primitiveToken: "neutral-50 @ 20%", description: "Hover border color" },
  { name: "--ring", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Focus ring color" },
];

const checkboxTokens = [
  { name: "--primary", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Border color and checked background" },
  { name: "--primary-foreground", value: "hsl(0 0% 100%)", primitiveToken: "white", description: "Checkmark color (checked state)" },
  { name: "--ring", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Focus ring color" },
];

const radioTokens = [
  { name: "--primary", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Border color and indicator fill" },
  { name: "--ring", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Focus ring color" },
];

const selectTokens = [
  { name: "--background", value: "hsl(0 0% 4%)", primitiveToken: "neutral-950", description: "Trigger background (bg-background)" },
  { name: "--input", value: "hsl(0 0% 12%)", primitiveToken: "neutral-900", description: "Trigger border color (border-input)" },
  { name: "--muted-foreground", value: "hsl(0 0% 50%)", primitiveToken: "neutral-500", description: "Placeholder text color" },
  { name: "--foreground/20", value: "hsla(0 0% 98% / 0.2)", primitiveToken: "neutral-50 @ 20%", description: "Hover border color" },
  { name: "--popover", value: "hsl(0 0% 10%)", primitiveToken: "neutral-800", description: "Dropdown content background" },
  { name: "--popover-foreground", value: "hsl(0 0% 98%)", primitiveToken: "neutral-50", description: "Dropdown text color" },
  { name: "--accent", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Item hover/focus background" },
  { name: "--accent-foreground", value: "hsl(0 0% 100%)", primitiveToken: "white", description: "Item hover/focus text" },
  { name: "--ring", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Focus ring color" },
];

const switchTokens = [
  { name: "--primary", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Checked state background" },
  { name: "--input", value: "hsl(0 0% 12%)", primitiveToken: "neutral-900", description: "Unchecked state background" },
  { name: "--background", value: "hsl(0 0% 4%)", primitiveToken: "neutral-950", description: "Thumb/knob color" },
  { name: "--ring", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Focus ring color" },
];

const textareaTokens = [
  { name: "--background", value: "hsl(0 0% 4%)", primitiveToken: "neutral-950", description: "Textarea background (bg-background)" },
  { name: "--input", value: "hsl(0 0% 12%)", primitiveToken: "neutral-900", description: "Border color (border-input)" },
  { name: "--muted-foreground", value: "hsl(0 0% 50%)", primitiveToken: "neutral-500", description: "Placeholder text color" },
  { name: "--foreground/20", value: "hsla(0 0% 98% / 0.2)", primitiveToken: "neutral-50 @ 20%", description: "Hover border color" },
  { name: "--ring", value: "hsl(14 80% 55%)", primitiveToken: "orange-500", description: "Focus ring color" },
];

interface CollapsibleSectionProps {
  title: string;
  description: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CollapsibleSection = ({ title, description, defaultOpen = false, children }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 sm:p-4 bg-surface-elevated hover:bg-surface-overlay transition-colors text-left gap-3"
      >
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-xs sm:text-sm text-foreground-secondary mt-1">{description}</p>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-foreground-muted shrink-0" />
        ) : (
          <ChevronRight className="w-5 h-5 text-foreground-muted shrink-0" />
        )}
      </button>
      {isOpen && <div className="p-3 sm:p-4 border-t border-border overflow-x-auto">{children}</div>}
    </div>
  );
};

const HierarchyDiagram = () => (
  <div className="p-4 sm:p-6 bg-surface-elevated rounded-lg border border-border mb-6 sm:mb-8">
    <h4 className="font-medium text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Token Hierarchy</h4>
    <div className="flex flex-col items-center gap-2 text-xs sm:text-sm">
      <div className="px-3 sm:px-4 py-2 bg-background-muted rounded-lg border border-border-subtle text-foreground-secondary text-center">
        Primitive Tokens <span className="text-foreground-muted">(Foundation)</span>
      </div>
      <div className="text-foreground-muted">↓ references</div>
      <div className="px-3 sm:px-4 py-2 bg-background-muted rounded-lg border border-border-subtle text-foreground-secondary text-center">
        Semantic Tokens <span className="text-foreground-muted">(Context)</span>
      </div>
      <div className="text-foreground-muted">↓ references</div>
      <div className="px-3 sm:px-4 py-2 bg-primary/10 rounded-lg border border-primary/30 text-primary font-medium text-center">
        Component Tokens <span className="text-primary/70">(Specific UI)</span>
      </div>
    </div>
  </div>
);

const ComponentColors = () => (
  <div className="space-y-8 sm:space-y-12">
    <Section
      title="Understanding Component Colors"
      description="Component colors sit on top of semantic tokens, providing component-specific naming while maintaining flexibility through semantic references."
    >
      <HierarchyDiagram />

      <div className="p-3 sm:p-4 bg-surface-elevated rounded-lg border border-border mb-4 sm:mb-6">
        <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">How It Works</h4>
        <p className="text-xs sm:text-sm text-foreground-secondary mb-2">
          Components reference semantic CSS variables via Tailwind utility classes. Each component maps to specific tokens:
        </p>
        <div className="mt-3 text-xs sm:text-sm text-foreground-secondary">
          <ul className="list-disc list-inside space-y-1 text-foreground-muted">
            <li><code className="text-[10px] sm:text-xs">bg-primary</code> → <code className="text-[10px] sm:text-xs">--primary</code></li>
            <li><code className="text-[10px] sm:text-xs">border-input</code> → <code className="text-[10px] sm:text-xs">--input</code></li>
            <li><code className="text-[10px] sm:text-xs">text-muted-foreground</code> → <code className="text-[10px] sm:text-xs">--muted-foreground</code></li>
          </ul>
        </div>
      </div>
    </Section>

    <Section title="Component Tokens">
      <div className="space-y-4">
        <CollapsibleSection
          title="Button"
          description="Semantic tokens used across button variants (default, secondary, destructive, outline, ghost, tertiary, danger, link)."
          defaultOpen={true}
        >
          <TokenTable tokens={buttonTokens} showSwatch />
        </CollapsibleSection>

        <CollapsibleSection
          title="Input"
          description="Tokens for text input fields including background, border, placeholder, and focus states."
        >
          <TokenTable tokens={inputTokens} showSwatch />
        </CollapsibleSection>

        <CollapsibleSection
          title="Checkbox"
          description="Tokens for checkbox checked/unchecked states and checkmark indicator."
        >
          <TokenTable tokens={checkboxTokens} showSwatch />
        </CollapsibleSection>

        <CollapsibleSection
          title="Radio Button"
          description="Tokens for radio button selected/unselected states and indicator dot."
        >
          <TokenTable tokens={radioTokens} showSwatch />
        </CollapsibleSection>

        <CollapsibleSection
          title="Select / Dropdown"
          description="Tokens for select trigger, dropdown content, and item hover/focus states."
        >
          <TokenTable tokens={selectTokens} showSwatch />
        </CollapsibleSection>

        <CollapsibleSection
          title="Switch"
          description="Tokens for toggle switch on/off states and thumb indicator."
        >
          <TokenTable tokens={switchTokens} showSwatch />
        </CollapsibleSection>

        <CollapsibleSection
          title="Textarea"
          description="Tokens for textarea background, border, placeholder, and focus states."
        >
          <TokenTable tokens={textareaTokens} showSwatch />
        </CollapsibleSection>
      </div>
    </Section>

    <Section title="Usage Guidelines">
      <DosDonts
        dos={[
          "Use semantic token classes (bg-primary, border-input) in components",
          "Reference the CSS variable layer for theming consistency",
          "Keep component styling connected to the token hierarchy",
          "Use Tailwind opacity modifiers (bg-primary/90) for hover states",
          "Maintain focus ring consistency with ring and ring-offset tokens",
        ]}
        donts={[
          "Use hardcoded hex/rgb values directly in component styles",
          "Create custom one-off color classes outside the token system",
          "Mix semantic tokens from unrelated contexts",
          "Skip the focus-visible ring pattern for interactive elements",
          "Override token values without updating the design system",
        ]}
      />
    </Section>
  </div>
);

const ColorPage = () => {
  const tabs = [
    {
      id: "primitive",
      label: "Primitive",
      content: <PrimitiveColors />,
    },
    {
      id: "semantic",
      label: "Semantic",
      content: <SemanticColors />,
    },
    {
      id: "component",
      label: "Component",
      content: <ComponentColors />,
    },
  ];

  return (
    <DocLayout>
      <PageHeader
        category="Foundations"
        title="Color"
        description="A systematic color palette built for dark interfaces. Colors are organized into primitive and semantic layers for flexibility and consistency."
      />

      <DocTabs tabs={tabs} />
    </DocLayout>
  );
};

export default ColorPage;
