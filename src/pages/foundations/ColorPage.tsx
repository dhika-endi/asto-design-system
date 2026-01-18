import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { TokenTable } from "@/components/docs/TokenTable";
import { DosDonts } from "@/components/docs/DosDonts";
import { DocTabs } from "@/components/docs/DocTabs";

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
  { name: "--text-primary", value: "#fafafa", description: "Main body text, headings" },
  { name: "--text-secondary", value: "#a6a6a6", description: "Supporting text, descriptions" },
  { name: "--text-muted", value: "#737373", description: "Placeholders, captions" },
  { name: "--text-disabled", value: "#4d4d4d", description: "Disabled states only" },
  { name: "--text-inverse", value: "#0a0a0a", description: "Text on light backgrounds" },
  { name: "--text-brand", value: "#ea580c", description: "Brand accent text, links, emphasis" },
];

const semanticSurface = [
  { name: "--surface-default", value: "#0a0a0a", description: "Page background" },
  { name: "--surface-elevated", value: "#121212", description: "Cards, panels" },
  { name: "--surface-overlay", value: "#1a1a1a", description: "Modals, dropdowns" },
  { name: "--surface-brand", value: "#ea580c", description: "Primary buttons, brand highlights" },
  { name: "--surface-brand-muted", value: "rgba(234, 88, 12, 0.15)", description: "Brand accent backgrounds" },
];

const semanticStroke = [
  { name: "--stroke-default", value: "#292929", description: "Component borders" },
  { name: "--stroke-subtle", value: "#1f1f1f", description: "Dividers, separators" },
  { name: "--stroke-strong", value: "#404040", description: "Focus rings, emphasis" },
  { name: "--stroke-brand", value: "#ea580c", description: "Active states, brand borders" },
];

const semanticStates = [
  { name: "--success", value: "#22c55e", description: "Positive actions, confirmations" },
  { name: "--success-muted", value: "rgba(34, 197, 94, 0.15)", description: "Success backgrounds" },
  { name: "--success-border", value: "rgba(34, 197, 94, 0.3)", description: "Success borders" },
  { name: "--warning", value: "#eab308", description: "Caution, attention needed" },
  { name: "--warning-muted", value: "rgba(234, 179, 8, 0.15)", description: "Warning backgrounds" },
  { name: "--warning-border", value: "rgba(234, 179, 8, 0.3)", description: "Warning borders" },
  { name: "--error", value: "#ef4444", description: "Errors, destructive actions" },
  { name: "--error-muted", value: "rgba(239, 68, 68, 0.15)", description: "Error backgrounds" },
  { name: "--error-border", value: "rgba(239, 68, 68, 0.3)", description: "Error borders" },
  { name: "--info", value: "#3b82f6", description: "Informational messages" },
  { name: "--info-muted", value: "rgba(59, 130, 246, 0.15)", description: "Info backgrounds" },
  { name: "--info-border", value: "rgba(59, 130, 246, 0.3)", description: "Info borders" },
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
      title="Surface"
      description="Surface colors create depth and spatial hierarchy. Layered backgrounds help users understand UI structure."
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
          "Maintain consistent contrast ratios for accessibility",
          "Layer surfaces from dark to light to create depth",
          "Use state colors consistently across all components",
          "Combine muted backgrounds with colored borders for subtle emphasis",
        ]}
        donts={[
          "Use primitive colors directly in components",
          "Mix semantic contexts (text color for backgrounds)",
          "Add new colors without updating the token system",
          "Use color as the only indicator of state or meaning",
          "Use full-saturation colors for large background areas",
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
