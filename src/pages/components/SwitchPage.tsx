import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { DocTabs } from "@/components/docs/DocTabs";
import { AnatomyBlock, AnatomyMarker } from "@/components/docs/AnatomyBlock";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { TokenTableWithPreview } from "@/components/docs/TokenTableWithPreview";
import { Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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

const SwitchOverview = () => (
  <div className="space-y-12">
    <Section
      title="Description"
      description="Switches are toggle controls that immediately activate or deactivate a feature or setting."
    >
      <p className="text-foreground-secondary">
        Unlike checkboxes that require form submission, switches take effect immediately when toggled.
        They represent a binary choice between two mutually exclusive states: on and off.
      </p>
    </Section>

    <Section title="Anatomy">
      <AnatomyBlock
        items={[
          { number: 1, label: "Track", required: true, description: "The background container that holds the thumb" },
          { number: 2, label: "Thumb", required: true, description: "The circular element that moves between on/off positions" },
          { number: 3, label: "Label", required: true, description: "Text describing what the switch controls" },
        ]}
      >
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <Switch id="anatomy-switch" checked />
            <AnatomyMarker number={1} className="absolute -bottom-7 left-1/2 -translate-x-1/2" />
            <AnatomyMarker number={2} className="absolute -top-7 right-0" />
          </div>
          <div className="relative">
            <Label htmlFor="anatomy-switch">Airplane mode</Label>
            <AnatomyMarker number={3} className="absolute -right-7 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </AnatomyBlock>
    </Section>

    <Section title="Types">
      <div className="space-y-6">
        <div className="p-6 bg-surface-elevated rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Basic switch</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Standard toggle for on/off settings.
          </p>
          <div className="flex items-center space-x-2">
            <Switch id="basic" />
            <Label htmlFor="basic">Enable feature</Label>
          </div>
        </div>

        <div className="p-6 bg-surface-elevated rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">With description</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Switch with additional context about what it controls.
          </p>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="desc-switch">Marketing emails</Label>
              <p className="text-xs text-foreground-muted">Receive updates about products and features</p>
            </div>
            <Switch id="desc-switch" />
          </div>
        </div>

        <div className="p-6 bg-surface-elevated rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Settings list</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Multiple switches in a settings panel.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="s1">Push notifications</Label>
              <Switch id="s1" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="s2">Email notifications</Label>
              <Switch id="s2" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="s3">SMS notifications</Label>
              <Switch id="s3" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const SwitchUsage = () => (
  <div className="space-y-12">
    <Section title="When to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>For binary settings that take effect immediately</li>
        <li>To toggle features on or off in settings panels</li>
        <li>When the action doesn't require a save/submit button</li>
        <li>For preferences that have clear on/off states</li>
      </ul>
    </Section>

    <Section title="When not to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>When the change requires form submission (use checkbox)</li>
        <li>For selecting from multiple options (use radio buttons)</li>
        <li>When the binary choice isn't clearly on/off (use checkbox)</li>
        <li>For accepting terms or conditions (use checkbox)</li>
      </ul>
    </Section>

    <Section title="Best practices">
      <div className="grid md:grid-cols-2 gap-6">
        <VisualExample type="do" caption="Use positive labels that describe the 'on' state">
          <div className="flex items-center gap-3">
            <Switch id="do1" defaultChecked />
            <Label htmlFor="do1">Show online status</Label>
          </div>
        </VisualExample>
        <VisualExample type="dont" caption="Avoid negative labels that cause double negatives">
          <div className="flex items-center gap-3">
            <Switch id="dont1" />
            <Label htmlFor="dont1">Hide online status</Label>
          </div>
        </VisualExample>
        <VisualExample type="do" caption="Place labels on the left for settings lists">
          <div className="flex items-center justify-between w-48">
            <Label htmlFor="do2">Dark mode</Label>
            <Switch id="do2" />
          </div>
        </VisualExample>
        <VisualExample type="dont" caption="Don't use switches for actions requiring confirmation">
          <div className="flex items-center gap-3">
            <Switch id="dont2" />
            <Label htmlFor="dont2">Delete account</Label>
          </div>
        </VisualExample>
      </div>
    </Section>
  </div>
);

const SwitchSpecifications = () => (
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
            <tr><td className="px-4 py-3 font-mono text-foreground">checked</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Current on/off state</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">defaultChecked</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Initial state</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">disabled</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Prevents interaction</td></tr>
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
            <tr><td className="px-4 py-3 text-foreground">Track width</td><td className="px-4 py-3 font-mono text-foreground-secondary">44px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Track height</td><td className="px-4 py-3 font-mono text-foreground-secondary">24px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Thumb size</td><td className="px-4 py-3 font-mono text-foreground-secondary">20×20px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Touch target</td><td className="px-4 py-3 font-mono text-foreground-secondary">min 44×44px</td></tr>
          </tbody>
        </table>
      </div>
    </Section>
  </div>
);

const SwitchInteractions = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-12">
      <Section title="States preview">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Off", checked: false, disabled: false },
            { label: "On", checked: true, disabled: false },
            { label: "Disabled off", checked: false, disabled: true },
            { label: "Disabled on", checked: true, disabled: true },
          ].map((state) => (
            <div key={state.label} className="p-4 bg-surface-elevated rounded-lg border border-border-glass text-center">
              <p className="text-xs text-foreground-muted mb-3">{state.label}</p>
              <div className="flex justify-center">
                <Switch checked={state.checked} disabled={state.disabled} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Interaction behavior">
        <InteractionTable
          states={[
            { state: "off", trigger: "Default / toggle off", visual: "Thumb on left, muted track", a11y: "aria-checked='false'" },
            { state: "hover", trigger: "Mouse over", visual: "Subtle highlight on track", a11y: "Cursor changes to pointer" },
            { state: "focus", trigger: "Tab / click", visual: "Focus ring around track", a11y: "Focus indicator visible" },
            { state: "on", trigger: "Click / Space", visual: "Thumb slides right, track fills with primary color", a11y: "aria-checked='true'" },
            { state: "disabled", trigger: "disabled prop", visual: "Reduced opacity, no interaction", a11y: "aria-disabled='true'" },
          ]}
        />
      </Section>
    </div>
  );
};

const SwitchAccessibility = () => (
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
            <tr><td className="px-4 py-3 font-mono text-foreground">Tab</td><td className="px-4 py-3 text-foreground-secondary">Move focus to switch</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Space</td><td className="px-4 py-3 text-foreground-secondary">Toggle on/off state</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Enter</td><td className="px-4 py-3 text-foreground-secondary">Toggle on/off state (optional)</td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="ARIA attributes">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">role="switch"</code> - Identifies as a switch control</li>
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">aria-checked</code> - Current on/off state</li>
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">aria-labelledby</code> - References the label</li>
      </ul>
    </Section>

    <Section title="Screen reader behavior">
      <p className="text-foreground-secondary">
        Screen readers announce the switch label, role, and current state (on/off).
        When toggled, the new state is immediately announced. Use clear labels that
        indicate what happens when the switch is on.
      </p>
    </Section>
  </div>
);

const SwitchCode = () => (
  <div className="space-y-12">
    <Section title="Basic usage">
      <CodeBlock
        code={`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`}
        language="tsx"
      />
    </Section>

    <Section title="Controlled">
      <CodeBlock
        code={`const [enabled, setEnabled] = useState(false)

<Switch 
  checked={enabled} 
  onCheckedChange={setEnabled}
/>`}
        language="tsx"
      />
    </Section>

    <Section title="Settings list pattern">
      <CodeBlock
        code={`<div className="space-y-4">
  <div className="flex items-center justify-between">
    <div>
      <Label htmlFor="notifications">Notifications</Label>
      <p className="text-sm text-muted-foreground">
        Receive push notifications
      </p>
    </div>
    <Switch id="notifications" />
  </div>
</div>`}
        language="tsx"
      />
    </Section>
  </div>
);

const SwitchTokens = () => (
  <div className="space-y-12">
    <Section title="Text tokens">
      <TokenTableWithPreview tokens={[
        { token: '--foreground', state: 'default, hover, focus, checked', usage: 'Label text color' },
        { token: '--foreground-secondary', state: 'default', usage: 'Description text color' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Label and description when disabled' },
      ]} />
    </Section>

    <Section title="Surface tokens">
      <TokenTableWithPreview tokens={[
        { token: '--muted', state: 'unchecked', usage: 'Track background when off' },
        { token: '--primary', state: 'checked', usage: 'Track background when on' },
        { token: '--background', state: 'default', usage: 'Thumb (knob) background' },
      ]} />
    </Section>

    <Section title="Stroke tokens">
      <TokenTableWithPreview tokens={[
        { token: '--ring', state: 'focus', usage: 'Focus ring color' },
      ]} />
    </Section>

    <Section title="Graphic tokens">
      <p className="text-foreground-secondary text-sm">
        Switch component does not use graphic tokens as it relies on surface color changes to communicate state.
      </p>
    </Section>

    <Section title="Contrast compliance">
      <div className="p-4 bg-surface-elevated rounded-xl border border-border-glass">
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground-secondary">
          <li>Track color change between on/off states meets 3:1 contrast ratio</li>
          <li>Thumb provides clear visibility against track in both states</li>
          <li>Focus ring provides minimum 3:1 contrast against adjacent colors</li>
        </ul>
      </div>
    </Section>
  </div>
);

const SwitchPage = () => {
  const tabs = [
    { id: "overview", label: "Overview", content: <SwitchOverview /> },
    { id: "usage", label: "Usage", content: <SwitchUsage /> },
    { id: "specifications", label: "Specifications", content: <SwitchSpecifications /> },
    { id: "tokens", label: "Tokens", content: <SwitchTokens /> },
    { id: "interactions", label: "Interactions", content: <SwitchInteractions /> },
    { id: "accessibility", label: "Accessibility", content: <SwitchAccessibility /> },
    { id: "code", label: "Code", content: <SwitchCode /> },
  ];

  return (
    <DocLayout>
      <PageHeader
        title="Switch"
        description="Switches toggle the state of a single setting on or off with immediate effect."
      />
      <DocTabs tabs={tabs} />
    </DocLayout>
  );
};

export default SwitchPage;
