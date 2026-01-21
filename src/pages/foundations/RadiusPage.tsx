import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { TokenTable } from "@/components/docs/TokenTable";
import { DosDonts } from "@/components/docs/DosDonts";

const radiusTokens = [
  { name: "--radius-none", value: "0px", description: "Sharp corners" },
  { name: "--radius-sm", value: "4px", description: "Subtle rounding" },
  { name: "--radius-md", value: "6px", description: "Default components" },
  { name: "--radius-lg", value: "8px", description: "Cards, panels" },
  { name: "--radius-xl", value: "12px", description: "Dialogs, modals" },
  { name: "--radius-2xl", value: "16px", description: "Large containers" },
  { name: "--radius-full", value: "9999px", description: "Pills, avatars" },
];

const RadiusPage = () => {
  return (
    <DocLayout>
      <PageHeader
        category="Foundations"
        title="Radius"
        description="Border radius defines the visual softness of elements. Consistent radius creates a cohesive, professional interface."
      />

      <Section
        title="Radius scale"
        description="A progressive scale from sharp to fully rounded. Choose based on element size and context."
      >
        <TokenTable tokens={radiusTokens} />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {radiusTokens.map((token) => (
            <div
              key={token.name}
              className="aspect-square bg-surface-elevated border border-border flex items-center justify-center"
              style={{ borderRadius: token.value }}
            >
              <span className="text-xs font-mono text-foreground-muted">
                {token.value}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Usage by component"
        description="Match radius to component size and hierarchy."
      >
        <div className="space-y-6">
          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-4">Small elements</h4>
            <p className="text-sm text-foreground-secondary mb-4">
              Buttons, inputs, badges use --radius-md (6px) for subtle softening
              without appearing overly rounded.
            </p>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-foreground text-background rounded-md text-sm font-medium">
                Button
              </button>
              <input
                type="text"
                placeholder="Input"
                className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-foreground-muted"
              />
            </div>
          </div>

          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-4">Medium elements</h4>
            <p className="text-sm text-foreground-secondary mb-4">
              Cards and panels use --radius-lg (8px) to create visual separation
              while maintaining a technical aesthetic.
            </p>
            <div className="p-4 bg-surface-elevated border border-border rounded-lg">
              <p className="text-sm text-foreground">Card content</p>
            </div>
          </div>

          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-4">Circular elements</h4>
            <p className="text-sm text-foreground-secondary mb-4">
              Avatars and pills use --radius-full for perfect circles or stadium shapes.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-sm font-medium">
                DA
              </div>
              <span className="px-3 py-1 bg-surface-elevated border border-border rounded-full text-xs text-foreground-secondary">
                Status pill
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Usage guidelines">
        <DosDonts
          dos={[
            "Match radius scale to element size",
            "Use consistent radius for similar components",
            "Apply full radius only to intentionally circular elements",
            "Consider the overall visual weight when choosing radius",
          ]}
          donts={[
            "Mix multiple radius values in the same component",
            "Use large radius on small elements",
            "Apply sharp corners to interactive elements without reason",
            "Create custom radius values outside the scale",
          ]}
        />
      </Section>
    </DocLayout>
  );
};

export default RadiusPage;
