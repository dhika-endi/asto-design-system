import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { DocTabs } from "@/components/docs/DocTabs";
import { AnatomyBlock, AnatomyMarker } from "@/components/docs/AnatomyBlock";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { TokenTableWithPreview } from "@/components/docs/TokenTableWithPreview";
import { Check, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const InteractionTable = ({ states }: { states: Array<{ state: string; trigger: string; visual: string; a11y: string }> }) => (
  <div className="overflow-hidden rounded-xl border border-border-glass">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-background-surface border-b border-border-glass">
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">State</th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Trigger</th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Visual Changes</th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Accessibility Notes</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border-subtle">
        {states.map((s, i) => (
          <tr key={i}>
            <td className="px-4 py-3 font-mono text-foreground">{s.state}</td>
            <td className="px-4 py-3 text-foreground-secondary">{s.trigger}</td>
            <td className="px-4 py-3 text-foreground-secondary">{s.visual}</td>
            <td className="px-4 py-3 text-foreground-secondary">{s.a11y}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const VisualExample = ({ 
  type, 
  caption, 
  children 
}: { 
  type: "do" | "dont"; 
  caption: string; 
  children: React.ReactNode 
}) => {
  const isDo = type === "do";
  return (
    <div className="space-y-0">
      <div className="p-8 bg-background-surface rounded-t-lg flex items-center justify-center min-h-[120px] border border-border-glass border-b-0">
        {children}
      </div>
      <div className={`p-3 border-t-4 ${isDo ? "border-success" : "border-error"} bg-background-elevated rounded-b-lg border border-border-glass border-t-0`}>
        <div className="flex items-start gap-2">
          {isDo ? (
            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
          ) : (
            <X className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />
          )}
          <div>
            <span className={`font-medium ${isDo ? "text-success" : "text-error"}`}>
              {isDo ? "Do" : "Don't"}
            </span>
            <p className="text-sm text-foreground-secondary mt-1">{caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckboxOverview = () => (
  <div className="space-y-12">
    <Section
      title="Description"
      description="Checkboxes allow users to select one or more options from a set. They are used when there are lists of options and the user may select any number of choices."
    >
      <p className="text-foreground-secondary">
        Use checkboxes when users need to select multiple items, toggle a single option on or off,
        or agree to terms and conditions. Each checkbox operates independently of others in a group.
      </p>
    </Section>

    <Section title="Anatomy">
      <AnatomyBlock
        items={[
          { number: 1, label: "Checkbox control", required: true, description: "The interactive square element that displays checked/unchecked state" },
          { number: 2, label: "Label", required: true, description: "Text that describes what the checkbox represents" },
          { number: 3, label: "Check indicator", required: false, description: "Visual mark shown when checkbox is selected" },
        ]}
      >
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <Checkbox id="anatomy-checkbox" checked />
            <AnatomyMarker number={1} className="absolute -left-7 top-1/2 -translate-y-1/2" />
            <AnatomyMarker number={3} className="absolute -top-7 left-1/2 -translate-x-1/2" />
          </div>
          <div className="relative">
            <Label htmlFor="anatomy-checkbox">Accept terms</Label>
            <AnatomyMarker number={2} className="absolute -right-7 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </AnatomyBlock>
    </Section>

    <Section title="Types">
      <div className="space-y-6">
        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Single checkbox</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Used for binary choices like accepting terms or enabling a feature.
          </p>
          <div className="flex items-center gap-2">
            <Checkbox id="single" />
            <Label htmlFor="single">Enable notifications</Label>
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Checkbox group</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Multiple checkboxes that allow selecting several options from a list.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="opt1" defaultChecked />
              <Label htmlFor="opt1">Email notifications</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="opt2" />
              <Label htmlFor="opt2">SMS notifications</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="opt3" defaultChecked />
              <Label htmlFor="opt3">Push notifications</Label>
            </div>
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Indeterminate</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Shows partial selection when a parent checkbox has some but not all children selected.
          </p>
          <div className="flex items-center gap-2">
            <Checkbox id="indeterminate" checked="indeterminate" />
            <Label htmlFor="indeterminate">Select all items</Label>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const CheckboxUsage = () => (
  <div className="space-y-12">
    <Section title="When to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>Allow users to select multiple options from a list</li>
        <li>Present a binary choice that requires explicit action</li>
        <li>Enable or disable a feature or setting</li>
        <li>Agree to terms, conditions, or consent forms</li>
      </ul>
    </Section>

    <Section title="When not to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>When only one selection is allowed (use radio buttons instead)</li>
        <li>For instant on/off toggles (use switch instead)</li>
        <li>When there are more than 7-10 options (consider a multi-select dropdown)</li>
      </ul>
    </Section>

    <Section title="Best practices">
      <div className="grid md:grid-cols-2 gap-6">
        <VisualExample type="do" caption="Use clear, descriptive labels that explain the option">
          <div className="flex items-center gap-2">
            <Checkbox id="do1" />
            <Label htmlFor="do1">Receive weekly newsletter</Label>
          </div>
        </VisualExample>
        <VisualExample type="dont" caption="Avoid vague or ambiguous labels">
          <div className="flex items-center gap-2">
            <Checkbox id="dont1" />
            <Label htmlFor="dont1">Newsletter</Label>
          </div>
        </VisualExample>
        <VisualExample type="do" caption="List options vertically for better scannability">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="do2a" />
              <Label htmlFor="do2a">Option A</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="do2b" />
              <Label htmlFor="do2b">Option B</Label>
            </div>
          </div>
        </VisualExample>
        <VisualExample type="dont" caption="Avoid horizontal layouts for multiple checkboxes">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="dont2a" />
              <Label htmlFor="dont2a">A</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="dont2b" />
              <Label htmlFor="dont2b">B</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="dont2c" />
              <Label htmlFor="dont2c">C</Label>
            </div>
          </div>
        </VisualExample>
      </div>
    </Section>
  </div>
);

const CheckboxSpecifications = () => (
  <div className="space-y-12">
    <Section title="Default properties">
      <div className="overflow-hidden rounded-xl border border-border-glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Property</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Default</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr><td className="px-4 py-3 font-mono text-foreground">checked</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Whether the checkbox is selected</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">disabled</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Prevents interaction</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">indeterminate</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Shows partial selection state</td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="Size constraints">
      <div className="overflow-hidden rounded-xl border border-border-glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Element</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr><td className="px-4 py-3 text-foreground">Checkbox size</td><td className="px-4 py-3 font-mono text-foreground-secondary">16×16px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Touch target</td><td className="px-4 py-3 font-mono text-foreground-secondary">min 44×44px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Gap to label</td><td className="px-4 py-3 font-mono text-foreground-secondary">8px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Border radius</td><td className="px-4 py-3 font-mono text-foreground-secondary">4px</td></tr>
          </tbody>
        </table>
      </div>
    </Section>
  </div>
);

const CheckboxInteractions = () => {
  const [states, setStates] = useState({
    default: false,
    hover: false,
    focus: false,
    checked: true,
    disabled: false,
  });

  return (
    <div className="space-y-12">
      <Section title="States preview">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Default", checked: false, disabled: false },
            { label: "Hover", checked: false, disabled: false, className: "ring-2 ring-primary/50" },
            { label: "Focus", checked: false, disabled: false, className: "ring-2 ring-ring ring-offset-2 ring-offset-background" },
            { label: "Checked", checked: true, disabled: false },
            { label: "Disabled", checked: false, disabled: true },
          ].map((state) => (
            <div key={state.label} className="p-4 bg-background-surface rounded-lg border border-border-glass text-center">
              <p className="text-xs text-foreground-muted mb-3">{state.label}</p>
              <div className="flex justify-center">
                <Checkbox checked={state.checked} disabled={state.disabled} className={state.className} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Interaction behavior">
        <InteractionTable
          states={[
            { state: "default", trigger: "Initial render", visual: "Empty square with border", a11y: "role='checkbox', aria-checked='false'" },
            { state: "hover", trigger: "Mouse over", visual: "Border color intensifies, subtle background", a11y: "Cursor changes to pointer" },
            { state: "focus", trigger: "Tab / click", visual: "Focus ring appears", a11y: "Focus indicator visible" },
            { state: "checked", trigger: "Click / Space / Enter", visual: "Check mark appears, filled background", a11y: "aria-checked='true'" },
            { state: "disabled", trigger: "disabled prop", visual: "Reduced opacity, no interactions", a11y: "aria-disabled='true'" },
          ]}
        />
      </Section>
    </div>
  );
};

const CheckboxAccessibility = () => (
  <div className="space-y-12">
    <Section title="Keyboard navigation">
      <div className="overflow-hidden rounded-xl border border-border-glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Key</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr><td className="px-4 py-3 font-mono text-foreground">Tab</td><td className="px-4 py-3 text-foreground-secondary">Move focus to checkbox</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Space</td><td className="px-4 py-3 text-foreground-secondary">Toggle checked state</td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="ARIA attributes">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li><code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">role="checkbox"</code> - Identifies the element as a checkbox</li>
        <li><code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">aria-checked</code> - Indicates current state (true/false/mixed)</li>
        <li><code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">aria-labelledby</code> or <code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">aria-label</code> - Provides accessible name</li>
        <li><code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">aria-disabled</code> - Indicates disabled state</li>
      </ul>
    </Section>

    <Section title="Screen reader behavior">
      <p className="text-foreground-secondary">
        Screen readers announce the checkbox label, current state (checked/unchecked/mixed), and role.
        When toggled, the new state is announced. Labels should be concise and action-oriented.
      </p>
    </Section>
  </div>
);

const CheckboxCode = () => (
  <div className="space-y-12">
    <Section title="Basic usage">
      <CodeBlock
        code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
        language="tsx"
      />
    </Section>

    <Section title="Controlled checkbox">
      <CodeBlock
        code={`const [checked, setChecked] = useState(false)

<Checkbox 
  checked={checked} 
  onCheckedChange={setChecked}
/>`}
        language="tsx"
      />
    </Section>

    <Section title="Checkbox group">
      <CodeBlock
        code={`const [selected, setSelected] = useState<string[]>([])

const options = ["email", "sms", "push"]

{options.map((option) => (
  <div key={option} className="flex items-center gap-2">
    <Checkbox
      id={option}
      checked={selected.includes(option)}
      onCheckedChange={(checked) => {
        setSelected(prev => 
          checked 
            ? [...prev, option]
            : prev.filter(o => o !== option)
        )
      }}
    />
    <Label htmlFor={option}>{option}</Label>
  </div>
))}`}
        language="tsx"
      />
    </Section>
  </div>
);

const CheckboxTokens = () => (
  <div className="space-y-12">
    <Section title="Text tokens">
      <TokenTableWithPreview tokens={[
        { token: '--foreground', state: 'default, hover, focus, checked', usage: 'Label text color' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Label text when disabled' },
      ]} />
    </Section>

    <Section title="Surface tokens">
      <TokenTableWithPreview tokens={[
        { token: '--background', state: 'default', usage: 'Unchecked checkbox background' },
        { token: '--primary', state: 'checked', usage: 'Checked checkbox background' },
        { token: '--muted', state: 'disabled', usage: 'Disabled checkbox background' },
      ]} />
    </Section>

    <Section title="Stroke tokens">
      <TokenTableWithPreview tokens={[
        { token: '--border', state: 'default', usage: 'Unchecked checkbox border' },
        { token: '--primary', state: 'hover, checked', usage: 'Hover and checked border' },
        { token: '--ring', state: 'focus', usage: 'Focus ring color' },
      ]} />
    </Section>

    <Section title="Graphic tokens">
      <TokenTableWithPreview tokens={[
        { token: '--primary-foreground', state: 'checked', usage: 'Check mark icon color' },
        { token: '--foreground-disabled', state: 'disabled + checked', usage: 'Check mark when disabled' },
      ]} />
    </Section>

    <Section title="Contrast compliance">
      <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground-secondary">
          <li>Check mark icon meets WCAG AA 4.5:1 contrast ratio against checked background</li>
          <li>Focus ring provides minimum 3:1 contrast against adjacent colors</li>
          <li>Border color provides sufficient contrast against both light and dark backgrounds</li>
        </ul>
      </div>
    </Section>
  </div>
);

const CheckboxPage = () => {
  const tabs = [
    { id: "overview", label: "Overview", content: <CheckboxOverview /> },
    { id: "usage", label: "Usage", content: <CheckboxUsage /> },
    { id: "specifications", label: "Specifications", content: <CheckboxSpecifications /> },
    { id: "tokens", label: "Tokens", content: <CheckboxTokens /> },
    { id: "interactions", label: "Interactions", content: <CheckboxInteractions /> },
    { id: "accessibility", label: "Accessibility", content: <CheckboxAccessibility /> },
    { id: "code", label: "Code", content: <CheckboxCode /> },
  ];

  return (
    <DocLayout>
      <PageHeader
        title="Checkbox"
        description="Checkboxes allow users to select one or more items from a set of options."
      />
      <DocTabs tabs={tabs} />
    </DocLayout>
  );
};

export default CheckboxPage;
