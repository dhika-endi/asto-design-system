import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { DocTabs } from "@/components/docs/DocTabs";
import { AnatomyBlock, AnatomyMarker } from "@/components/docs/AnatomyBlock";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { TokenTableWithPreview } from "@/components/docs/TokenTableWithPreview";
import { Check, X, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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

const SelectOverview = () => (
  <div className="space-y-12">
    <Section
      title="Description"
      description="Select components allow users to choose one option from a dropdown list of predefined options."
    >
      <p className="text-foreground-secondary">
        Use selects when you have a list of options that would take up too much space as radio buttons.
        They're ideal for forms and settings where users need to pick from 5 or more options.
      </p>
    </Section>

    <Section title="Anatomy">
      <AnatomyBlock
        items={[
          { number: 1, label: "Trigger", required: true, description: "The button that opens the dropdown and displays the selected value" },
          { number: 2, label: "Placeholder/Value", required: true, description: "Text showing either placeholder or selected option" },
          { number: 3, label: "Chevron", required: true, description: "Indicator showing the control opens a dropdown" },
          { number: 4, label: "Dropdown", required: true, description: "The list of available options" },
        ]}
        minHeight="280px"
      >
        <div className="relative">
          <div className="relative w-48">
            <div className="flex items-center justify-between px-3 py-2 bg-input border border-border rounded-md transition-colors hover:border-foreground/20 cursor-pointer">
              <span className="text-sm text-foreground">Option 1</span>
              <ChevronDown className="w-4 h-4 text-foreground-muted" />
            </div>
            <AnatomyMarker number={1} className="absolute -left-7 top-1/2 -translate-y-1/2" />
            <AnatomyMarker number={2} className="absolute left-12 -top-7" />
            <AnatomyMarker number={3} className="absolute -right-7 top-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute top-12 left-0 w-48 bg-popover border border-border rounded-md shadow-lg p-1">
            <div className="px-2 py-1.5 text-sm text-foreground rounded hover:bg-accent transition-colors cursor-pointer">Option 1</div>
            <div className="px-2 py-1.5 text-sm text-foreground-muted rounded hover:bg-accent hover:text-foreground transition-colors cursor-pointer">Option 2</div>
            <div className="px-2 py-1.5 text-sm text-foreground-muted rounded hover:bg-accent hover:text-foreground transition-colors cursor-pointer">Option 3</div>
            <AnatomyMarker number={4} className="absolute -right-7 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </AnatomyBlock>
    </Section>

    <Section title="Types">
      <div className="space-y-6">
        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Basic select</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Standard dropdown with single selection.
          </p>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">With label</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Select with associated label for form contexts.
          </p>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select>
              <SelectTrigger id="country" className="w-[200px]">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Disabled</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Select in disabled state.
          </p>
          <Select disabled>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Section>
  </div>
);

const SelectUsage = () => (
  <div className="space-y-12">
    <Section title="When to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>When users need to select one option from 5+ choices</li>
        <li>When space is limited and options can't be shown as radio buttons</li>
        <li>For form fields like country, state, or category selection</li>
        <li>When the list of options is known and fixed</li>
      </ul>
    </Section>

    <Section title="When not to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>When there are fewer than 5 options (use radio buttons)</li>
        <li>When users need to select multiple options (use multi-select or checkboxes)</li>
        <li>When users should be able to enter custom values (use combobox)</li>
        <li>For navigation or actions (use dropdown menu)</li>
      </ul>
    </Section>

    <Section title="Best practices">
      <div className="grid md:grid-cols-2 gap-6">
        <VisualExample type="do" caption="Use a descriptive placeholder that explains what to select">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select your timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pst">Pacific Time</SelectItem>
              <SelectItem value="est">Eastern Time</SelectItem>
            </SelectContent>
          </Select>
        </VisualExample>
        <VisualExample type="dont" caption="Avoid generic placeholders like 'Select...'">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pst">Pacific Time</SelectItem>
              <SelectItem value="est">Eastern Time</SelectItem>
            </SelectContent>
          </Select>
        </VisualExample>
      </div>
    </Section>
  </div>
);

const SelectSpecifications = () => (
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
            <tr><td className="px-4 py-3 font-mono text-foreground">value</td><td className="px-4 py-3 text-foreground-secondary">undefined</td><td className="px-4 py-3 text-foreground-secondary">Currently selected value</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">defaultValue</td><td className="px-4 py-3 text-foreground-secondary">undefined</td><td className="px-4 py-3 text-foreground-secondary">Initial value</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">disabled</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Prevents interaction</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">open</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Dropdown visibility</td></tr>
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
            <tr><td className="px-4 py-3 text-foreground">Trigger height</td><td className="px-4 py-3 font-mono text-foreground-secondary">40px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Min width</td><td className="px-4 py-3 font-mono text-foreground-secondary">120px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Max dropdown height</td><td className="px-4 py-3 font-mono text-foreground-secondary">300px (scrollable)</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Option height</td><td className="px-4 py-3 font-mono text-foreground-secondary">36px</td></tr>
          </tbody>
        </table>
      </div>
    </Section>
  </div>
);

const SelectInteractions = () => (
  <div className="space-y-12">
    <Section title="States preview">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Default", disabled: false, placeholder: "Select option" },
          { label: "With value", disabled: false, value: "selected" },
          { label: "Focus", disabled: false, placeholder: "Select option", focus: true },
          { label: "Disabled", disabled: true, placeholder: "Disabled" },
        ].map((state) => (
          <div key={state.label} className="p-4 bg-background-surface rounded-lg border border-border-glass text-center">
            <p className="text-xs text-foreground-muted mb-3">{state.label}</p>
            <Select disabled={state.disabled} value={state.value}>
              <SelectTrigger className={`w-full ${state.focus ? 'ring-2 ring-ring ring-offset-2 ring-offset-background' : ''}`}>
                <SelectValue placeholder={state.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="selected">Selected option</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Interaction behavior">
      <InteractionTable
        states={[
          { state: "closed", trigger: "Default state", visual: "Trigger shows placeholder or value", a11y: "aria-expanded='false'" },
          { state: "hover", trigger: "Mouse over trigger", visual: "Border color intensifies", a11y: "Cursor changes to pointer" },
          { state: "focus", trigger: "Tab / click", visual: "Focus ring on trigger", a11y: "Focus indicator visible" },
          { state: "open", trigger: "Click / Space / Enter", visual: "Dropdown appears below trigger", a11y: "aria-expanded='true'" },
          { state: "option hover", trigger: "Mouse over option", visual: "Option background highlights", a11y: "aria-selected updates" },
          { state: "selected", trigger: "Click option / Enter", visual: "Dropdown closes, value updates", a11y: "Value announced" },
        ]}
      />
    </Section>
  </div>
);

const SelectAccessibility = () => (
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
            <tr><td className="px-4 py-3 font-mono text-foreground">Tab</td><td className="px-4 py-3 text-foreground-secondary">Move focus to trigger</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Space / Enter</td><td className="px-4 py-3 text-foreground-secondary">Open dropdown</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Arrow Down/Up</td><td className="px-4 py-3 text-foreground-secondary">Navigate options</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Enter</td><td className="px-4 py-3 text-foreground-secondary">Select highlighted option</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Escape</td><td className="px-4 py-3 text-foreground-secondary">Close dropdown</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Type characters</td><td className="px-4 py-3 text-foreground-secondary">Jump to matching option</td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="ARIA attributes">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li><code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">role="combobox"</code> - Trigger role</li>
        <li><code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">aria-expanded</code> - Dropdown open state</li>
        <li><code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">aria-haspopup="listbox"</code> - Indicates popup type</li>
        <li><code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">role="listbox"</code> - Dropdown role</li>
        <li><code className="text-sm bg-background-surface px-1.5 py-0.5 rounded">role="option"</code> - Individual option role</li>
      </ul>
    </Section>
  </div>
);

const SelectCode = () => (
  <div className="space-y-12">
    <Section title="Basic usage">
      <CodeBlock
        code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`}
        language="tsx"
      />
    </Section>

    <Section title="Controlled">
      <CodeBlock
        code={`const [value, setValue] = useState("")

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`}
        language="tsx"
      />
    </Section>

    <Section title="With groups">
      <CodeBlock
        code={`import { SelectGroup, SelectLabel } from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Time</SelectItem>
      <SelectItem value="pst">Pacific Time</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">GMT</SelectItem>
      <SelectItem value="cet">Central European</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
        language="tsx"
      />
    </Section>
  </div>
);

const SelectTokens = () => (
  <div className="space-y-12">
    <Section title="Text tokens">
      <TokenTableWithPreview tokens={[
        { token: '--foreground', state: 'default, hover, focus, selected', usage: 'Selected value and option text' },
        { token: '--foreground-muted', state: 'default', usage: 'Placeholder text' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Text when disabled' },
      ]} />
    </Section>

    <Section title="Surface tokens">
      <TokenTableWithPreview tokens={[
        { token: '--background', state: 'default', usage: 'Trigger and dropdown background' },
        { token: '--accent', state: 'hover', usage: 'Option hover background' },
        { token: '--muted', state: 'disabled', usage: 'Disabled trigger background' },
      ]} />
    </Section>

    <Section title="Stroke tokens">
      <TokenTableWithPreview tokens={[
        { token: '--border', state: 'default', usage: 'Trigger border' },
        { token: '--border-strong', state: 'hover', usage: 'Trigger hover border' },
        { token: '--ring', state: 'focus, open', usage: 'Focus ring color' },
      ]} />
    </Section>

    <Section title="Graphic tokens">
      <TokenTableWithPreview tokens={[
        { token: '--foreground-muted', state: 'default', usage: 'Chevron icon color' },
        { token: '--primary', state: 'selected', usage: 'Check icon for selected option' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Icon when disabled' },
      ]} />
    </Section>

    <Section title="Contrast compliance">
      <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground-secondary">
          <li>Selected option text meets WCAG AA 4.5:1 contrast ratio</li>
          <li>Focus ring provides minimum 3:1 contrast against adjacent colors</li>
          <li>Hover background provides sufficient differentiation from default state</li>
        </ul>
      </div>
    </Section>
  </div>
);

const SelectPage = () => {
  const tabs = [
    { id: "overview", label: "Overview", content: <SelectOverview /> },
    { id: "usage", label: "Usage", content: <SelectUsage /> },
    { id: "specifications", label: "Specifications", content: <SelectSpecifications /> },
    { id: "tokens", label: "Tokens", content: <SelectTokens /> },
    { id: "interactions", label: "Interactions", content: <SelectInteractions /> },
    { id: "accessibility", label: "Accessibility", content: <SelectAccessibility /> },
    { id: "code", label: "Code", content: <SelectCode /> },
  ];

  return (
    <DocLayout>
      <PageHeader
        title="Select"
        description="Select components allow users to choose a single option from a dropdown list."
      />
      <DocTabs tabs={tabs} />
    </DocLayout>
  );
};

export default SelectPage;
