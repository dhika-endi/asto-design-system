import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { TokenTable } from "@/components/docs/TokenTable";
import { DosDonts } from "@/components/docs/DosDonts";

const spacingScale = [
  { name: "--space-0", value: "0px" },
  { name: "--space-1", value: "1px" },
  { name: "--space-2", value: "2px" },
  { name: "--space-4", value: "4px" },
  { name: "--space-6", value: "6px" },
  { name: "--space-8", value: "8px" },
  { name: "--space-10", value: "10px" },
  { name: "--space-12", value: "12px" },
  { name: "--space-14", value: "14px" },
  { name: "--space-16", value: "16px" },
  { name: "--space-18", value: "18px" },
  { name: "--space-20", value: "20px" },
  { name: "--space-22", value: "22px" },
  { name: "--space-24", value: "24px" },
  { name: "--space-26", value: "26px" },
  { name: "--space-28", value: "28px" },
  { name: "--space-30", value: "30px" },
  { name: "--space-32", value: "32px" },
  { name: "--space-36", value: "36px" },
  { name: "--space-40", value: "40px" },
  { name: "--space-48", value: "48px" },
  { name: "--space-56", value: "56px" },
  { name: "--space-64", value: "64px" },
  { name: "--space-80", value: "80px" },
  { name: "--space-88", value: "88px" },
  { name: "--space-96", value: "96px" },
  { name: "--space-112", value: "112px" },
  { name: "--space-128", value: "128px" },
  { name: "--space-144", value: "144px" },
  { name: "--space-160", value: "160px" },
];

const SpacingPage = () => {
  return (
    <DocLayout>
      <PageHeader
        category="Foundations"
        title="Spacing"
        description="Consistent spacing creates visual rhythm and hierarchy. A base-4 scale provides flexibility while maintaining harmony."
      />

      <Section
        title="Spacing scale"
        description="All spacing values are multiples of 4px. This creates predictable, harmonious layouts."
      >
        <TokenTable tokens={spacingScale} />
        <div className="mt-6 p-6 bg-surface-elevated rounded-lg border border-border">
          <p className="text-sm text-foreground-muted mb-4">Visual scale</p>
          <div className="space-y-2">
            {spacingScale.filter(s => parseInt(s.value) > 0 && parseInt(s.value) <= 64).map((space) => (
              <div key={space.name} className="flex items-center gap-4">
                <span className="text-xs font-mono text-foreground-muted w-24">
                  {space.name}
                </span>
                <div
                  className="h-4 bg-accent rounded"
                  style={{ width: space.value }}
                />
                <span className="text-xs text-foreground-secondary">
                  {space.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        title="Component spacing"
        description="Internal padding and gaps within components."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-4">Input fields</h4>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <p>Horizontal padding: 12px (--space-12)</p>
              <p>Vertical padding: 8px (--space-8)</p>
              <p>Label gap: 8px (--space-8)</p>
            </div>
          </div>
          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-4">Buttons</h4>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <p>Horizontal padding: 16px (--space-16)</p>
              <p>Vertical padding: 8px (--space-8)</p>
              <p>Icon gap: 8px (--space-8)</p>
            </div>
          </div>
          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-4">Cards</h4>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <p>Padding: 24px (--space-24)</p>
              <p>Content gap: 16px (--space-16)</p>
            </div>
          </div>
          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-4">Form groups</h4>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <p>Field gap: 24px (--space-24)</p>
              <p>Section gap: 32px (--space-32)</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Vertical rhythm"
        description="Consistent vertical spacing creates a readable flow."
      >
        <div className="space-y-4 text-foreground-secondary">
          <p>
            Between paragraphs: 16px (--space-16)
          </p>
          <p>
            Between sections: 48px (--space-48)
          </p>
          <p>
            Page margins: 32px minimum (--space-32)
          </p>
        </div>
      </Section>

      <Section title="Usage guidelines">
        <DosDonts
          dos={[
            "Use spacing tokens instead of arbitrary values",
            "Maintain consistent gaps between similar elements",
            "Increase spacing as element importance grows",
            "Use larger spacing to separate distinct sections",
          ]}
          donts={[
            "Use pixel values outside the spacing scale",
            "Mix different spacing patterns in similar contexts",
            "Reduce spacing below minimum touch targets (44px)",
            "Create visual tension with inconsistent gaps",
          ]}
        />
      </Section>
    </DocLayout>
  );
};

export default SpacingPage;
