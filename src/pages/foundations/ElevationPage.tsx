import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { TokenTable } from "@/components/docs/TokenTable";
import { DosDonts } from "@/components/docs/DosDonts";

const elevationTokens = [
  { name: "--shadow-none", value: "none", description: "Flat elements" },
  { name: "--shadow-sm", value: "0 1px 2px rgba(0,0,0,0.4)", description: "Subtle lift" },
  { name: "--shadow-md", value: "0 4px 6px rgba(0,0,0,0.5)", description: "Cards, dropdowns" },
  { name: "--shadow-lg", value: "0 10px 15px rgba(0,0,0,0.5)", description: "Modals, popovers" },
  { name: "--shadow-xl", value: "0 20px 25px rgba(0,0,0,0.6)", description: "Dialogs" },
];

const ElevationPage = () => {
  return (
    <DocLayout>
      <PageHeader
        category="Foundations"
        title="Elevation"
        description="Elevation creates visual hierarchy through shadow depth. In dark mode, shadows appear more subtle and rely on surface color layering."
      />

      <Section
        title="Shadow tokens"
        description="Progressive shadow depths for different elevation levels. Dark mode requires higher opacity shadows for visibility."
      >
        <TokenTable tokens={elevationTokens} />
        <div className="mt-6 grid md:grid-cols-3 gap-8 p-8 bg-background rounded-lg">
          {elevationTokens.slice(1).map((token, index) => (
            <div
              key={token.name}
              className="p-6 bg-surface-elevated rounded-lg"
              style={{
                boxShadow:
                  index === 0
                    ? "0 1px 2px rgba(0,0,0,0.4)"
                    : index === 1
                    ? "0 4px 6px rgba(0,0,0,0.5)"
                    : index === 2
                    ? "0 10px 15px rgba(0,0,0,0.5)"
                    : "0 20px 25px rgba(0,0,0,0.6)",
              }}
            >
              <p className="text-sm font-mono text-foreground-muted mb-2">
                {token.name}
              </p>
              <p className="text-xs text-foreground-secondary">
                {token.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Dark mode behavior"
        description="In dark interfaces, shadows are less visible. Combine shadows with surface color changes for clear depth."
      >
        <div className="space-y-6">
          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-4">
              Surface layering strategy
            </h4>
            <p className="text-sm text-foreground-secondary mb-4">
              Rather than relying solely on shadows, use progressively lighter
              background colors to indicate elevation. This approach works
              better in dark mode where shadows are naturally less prominent.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 p-4 bg-background rounded border border-border-subtle">
                <p className="text-xs text-foreground-muted">Background</p>
              </div>
              <div className="flex-1 p-4 bg-surface rounded border border-border-subtle">
                <p className="text-xs text-foreground-muted">Surface</p>
              </div>
              <div className="flex-1 p-4 bg-surface-elevated rounded border border-border-subtle">
                <p className="text-xs text-foreground-muted">Elevated</p>
              </div>
              <div className="flex-1 p-4 bg-surface-overlay rounded border border-border-subtle">
                <p className="text-xs text-foreground-muted">Overlay</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-4">
              When to use shadows
            </h4>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              <li>Floating elements that overlap content (dropdowns, tooltips)</li>
              <li>Modal dialogs to create separation from the page</li>
              <li>Cards that need additional visual distinction</li>
              <li>Focus states for accessibility emphasis</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage guidelines">
        <DosDonts
          dos={[
            "Combine shadows with surface color layering",
            "Use higher opacity shadows in dark mode",
            "Reserve large shadows for truly floating elements",
            "Apply shadows consistently for similar elevation levels",
          ]}
          donts={[
            "Use shadows as the only indicator of elevation",
            "Apply shadows to every card or container",
            "Use light-mode shadow values in dark interfaces",
            "Create elevation levels outside the defined scale",
          ]}
        />
      </Section>
    </DocLayout>
  );
};

export default ElevationPage;
