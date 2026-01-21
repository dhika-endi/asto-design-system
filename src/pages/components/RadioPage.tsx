import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { DocTabs } from "@/components/docs/DocTabs";
import { AnatomyBlock, AnatomyMarker } from "@/components/docs/AnatomyBlock";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { TokenTableWithPreview } from "@/components/docs/TokenTableWithPreview";
import { Check, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const InteractionTable = ({ states }: { states: Array<{ state: string; trigger: string; visual: string; a11y: string }> }) => (
  <div className="overflow-hidden rounded-xl border border-border-glass">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-surface-elevated border-b border-border-glass">
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
      <div className="p-8 bg-surface-elevated rounded-t-lg flex items-center justify-center min-h-[120px] border border-border-glass border-b-0">
        {children}
      </div>
      <div className={`p-3 border-t-4 ${isDo ? "border-success" : "border-error"} bg-surface-elevated rounded-b-lg border border-border-glass border-t-0`}>
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

const RadioOverview = () => (
  <div className="space-y-12">
    <Section
      title="Description"
      description="Radio buttons allow users to select exactly one option from a set of mutually exclusive choices."
    >
      <p className="text-foreground-secondary">
        Use radio buttons when users must choose one option from a visible list. 
        Unlike checkboxes, selecting one radio button automatically deselects any other selected option in the group.
      </p>
    </Section>

    <Section title="Anatomy">
      <AnatomyBlock
        items={[
          { number: 1, label: "Radio control", required: true, description: "The circular element that displays selected/unselected state" },
          { number: 2, label: "Selection indicator", required: false, description: "Inner dot that appears when option is selected" },
          { number: 3, label: "Label", required: true, description: "Text describing the option" },
        ]}
      >
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <RadioGroup defaultValue="selected">
              <RadioGroupItem value="selected" id="anatomy-radio" />
            </RadioGroup>
            <AnatomyMarker number={1} className="absolute -left-7 top-1/2 -translate-y-1/2" />
            <AnatomyMarker number={2} className="absolute -top-7 left-1/2 -translate-x-1/2" />
          </div>
          <div className="relative">
            <Label htmlFor="anatomy-radio">Option label</Label>
            <AnatomyMarker number={3} className="absolute -right-7 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </AnatomyBlock>
    </Section>

    <Section title="Types">
      <div className="space-y-6">
        <div className="p-6 bg-surface-elevated rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Standard radio group</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Vertical list of mutually exclusive options.
          </p>
          <RadioGroup defaultValue="option1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="r1" />
              <Label htmlFor="r1">Standard shipping (5-7 days)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="r2" />
              <Label htmlFor="r2">Express shipping (2-3 days)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="r3" />
              <Label htmlFor="r3">Next day delivery</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="p-6 bg-surface-elevated rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">With descriptions</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Radio options with additional helper text.
          </p>
          <RadioGroup defaultValue="free">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="free" id="plan1" className="mt-1" />
              <div>
                <Label htmlFor="plan1">Free plan</Label>
                <p className="text-xs text-foreground-muted">Up to 5 projects, basic features</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="pro" id="plan2" className="mt-1" />
              <div>
                <Label htmlFor="plan2">Pro plan</Label>
                <p className="text-xs text-foreground-muted">Unlimited projects, advanced features</p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Section>
  </div>
);

const RadioUsage = () => (
  <div className="space-y-12">
    <Section title="When to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>When users must select exactly one option from a list</li>
        <li>When all options should be visible and comparable</li>
        <li>When the list has 2-7 options</li>
        <li>For mutually exclusive choices like payment methods or shipping options</li>
      </ul>
    </Section>

    <Section title="When not to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>When users can select multiple options (use checkboxes)</li>
        <li>When there are more than 7 options (use a select dropdown)</li>
        <li>For binary on/off choices (use a switch)</li>
        <li>When options don't need to be compared simultaneously (use a dropdown)</li>
      </ul>
    </Section>

    <Section title="Best practices">
      <div className="grid md:grid-cols-2 gap-6">
        <VisualExample type="do" caption="Always provide a default selection when possible">
          <RadioGroup defaultValue="option1">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option1" id="do-r1" />
                <Label htmlFor="do-r1">Recommended</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option2" id="do-r2" />
                <Label htmlFor="do-r2">Alternative</Label>
              </div>
            </div>
          </RadioGroup>
        </VisualExample>
        <VisualExample type="dont" caption="Don't leave radio groups without a default unless necessary">
          <RadioGroup>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option1" id="dont-r1" />
                <Label htmlFor="dont-r1">Option A</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option2" id="dont-r2" />
                <Label htmlFor="dont-r2">Option B</Label>
              </div>
            </div>
          </RadioGroup>
        </VisualExample>
      </div>
    </Section>
  </div>
);

const RadioSpecifications = () => (
  <div className="space-y-12">
    <Section title="Default properties">
      <div className="overflow-hidden rounded-xl border border-border-glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-elevated border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Property</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Default</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr><td className="px-4 py-3 font-mono text-foreground">value</td><td className="px-4 py-3 text-foreground-secondary">undefined</td><td className="px-4 py-3 text-foreground-secondary">Currently selected value</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">defaultValue</td><td className="px-4 py-3 text-foreground-secondary">undefined</td><td className="px-4 py-3 text-foreground-secondary">Initial selected value</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">disabled</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Prevents all interactions</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">orientation</td><td className="px-4 py-3 text-foreground-secondary">vertical</td><td className="px-4 py-3 text-foreground-secondary">Layout direction</td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="Size constraints">
      <div className="overflow-hidden rounded-xl border border-border-glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-elevated border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Element</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr><td className="px-4 py-3 text-foreground">Radio size</td><td className="px-4 py-3 font-mono text-foreground-secondary">16×16px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Inner dot size</td><td className="px-4 py-3 font-mono text-foreground-secondary">8×8px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Touch target</td><td className="px-4 py-3 font-mono text-foreground-secondary">min 44×44px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Gap between options</td><td className="px-4 py-3 font-mono text-foreground-secondary">12px</td></tr>
          </tbody>
        </table>
      </div>
    </Section>
  </div>
);

const RadioInteractions = () => (
  <div className="space-y-12">
    <Section title="States preview">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Unselected", selected: false, disabled: false },
          { label: "Selected", selected: true, disabled: false },
          { label: "Disabled", selected: false, disabled: true },
          { label: "Disabled selected", selected: true, disabled: true },
        ].map((state, i) => (
          <div key={state.label} className="p-4 bg-surface-elevated rounded-lg border border-border-glass text-center">
            <p className="text-xs text-foreground-muted mb-3">{state.label}</p>
            <div className="flex justify-center">
              <RadioGroup defaultValue={state.selected ? "selected" : undefined} disabled={state.disabled}>
                <RadioGroupItem value="selected" />
              </RadioGroup>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Interaction behavior">
      <InteractionTable
        states={[
          { state: "unselected", trigger: "Initial / other selected", visual: "Empty circle with border", a11y: "aria-checked='false'" },
          { state: "hover", trigger: "Mouse over", visual: "Border color intensifies", a11y: "Cursor changes to pointer" },
          { state: "focus", trigger: "Tab navigation", visual: "Focus ring appears", a11y: "Focus indicator visible" },
          { state: "selected", trigger: "Click / Space", visual: "Inner dot appears", a11y: "aria-checked='true'" },
          { state: "disabled", trigger: "disabled prop", visual: "Reduced opacity", a11y: "aria-disabled='true'" },
        ]}
      />
    </Section>
  </div>
);

const RadioAccessibility = () => (
  <div className="space-y-12">
    <Section title="Keyboard navigation">
      <div className="overflow-hidden rounded-xl border border-border-glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-elevated border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Key</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr><td className="px-4 py-3 font-mono text-foreground">Tab</td><td className="px-4 py-3 text-foreground-secondary">Move focus to/from radio group</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Arrow Down/Right</td><td className="px-4 py-3 text-foreground-secondary">Select next option</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Arrow Up/Left</td><td className="px-4 py-3 text-foreground-secondary">Select previous option</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Space</td><td className="px-4 py-3 text-foreground-secondary">Select focused option</td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="ARIA attributes">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">role="radiogroup"</code> - Container role</li>
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">role="radio"</code> - Individual option role</li>
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">aria-checked</code> - Selection state</li>
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">aria-labelledby</code> - Group label reference</li>
      </ul>
    </Section>
  </div>
);

const RadioCode = () => (
  <div className="space-y-12">
    <Section title="Basic usage">
      <CodeBlock
        code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>`}
        language="tsx"
      />
    </Section>

    <Section title="Controlled">
      <CodeBlock
        code={`const [value, setValue] = useState("option1")

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>`}
        language="tsx"
      />
    </Section>
  </div>
);

const RadioTokens = () => (
  <div className="space-y-12">
    <Section title="Text tokens">
      <TokenTableWithPreview tokens={[
        { token: '--foreground', state: 'default, hover, focus, selected', usage: 'Label text color' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Label text when disabled' },
      ]} />
    </Section>

    <Section title="Surface tokens">
      <TokenTableWithPreview tokens={[
        { token: '--background', state: 'default', usage: 'Unselected radio background' },
        { token: '--muted', state: 'disabled', usage: 'Disabled radio background' },
      ]} />
    </Section>

    <Section title="Stroke tokens">
      <TokenTableWithPreview tokens={[
        { token: '--border', state: 'default', usage: 'Unselected radio border' },
        { token: '--primary', state: 'hover, selected', usage: 'Hover and selected border' },
        { token: '--ring', state: 'focus', usage: 'Focus ring color' },
      ]} />
    </Section>

    <Section title="Graphic tokens">
      <TokenTableWithPreview tokens={[
        { token: '--primary', state: 'selected', usage: 'Inner dot indicator fill' },
        { token: '--foreground-disabled', state: 'disabled + selected', usage: 'Inner dot when disabled' },
      ]} />
    </Section>

    <Section title="Contrast compliance">
      <div className="p-4 bg-surface-elevated rounded-xl border border-border-glass">
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground-secondary">
          <li>Selected indicator meets WCAG AA 3:1 contrast ratio for non-text elements</li>
          <li>Focus ring provides minimum 3:1 contrast against adjacent colors</li>
          <li>Border provides sufficient contrast in both selected and unselected states</li>
        </ul>
      </div>
    </Section>
  </div>
);

const RadioPage = () => {
  const tabs = [
    { id: "overview", label: "Overview", content: <RadioOverview /> },
    { id: "usage", label: "Usage", content: <RadioUsage /> },
    { id: "specifications", label: "Specifications", content: <RadioSpecifications /> },
    { id: "tokens", label: "Tokens", content: <RadioTokens /> },
    { id: "interactions", label: "Interactions", content: <RadioInteractions /> },
    { id: "accessibility", label: "Accessibility", content: <RadioAccessibility /> },
    { id: "code", label: "Code", content: <RadioCode /> },
  ];

  return (
    <DocLayout>
      <PageHeader
        title="Radio Button"
        description="Radio buttons allow users to select exactly one option from a set of mutually exclusive choices."
      />
      <DocTabs tabs={tabs} />
    </DocLayout>
  );
};

export default RadioPage;
