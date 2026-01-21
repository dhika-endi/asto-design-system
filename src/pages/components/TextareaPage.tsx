import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { DocTabs } from "@/components/docs/DocTabs";
import { AnatomyBlock, AnatomyMarker } from "@/components/docs/AnatomyBlock";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { TokenTableWithPreview } from "@/components/docs/TokenTableWithPreview";
import { Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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

const TextareaOverview = () => (
  <div className="space-y-12">
    <Section
      title="Description"
      description="Textarea components allow users to enter multiple lines of text. They're used for longer-form content like comments, descriptions, and messages."
    >
      <p className="text-foreground-secondary">
        Use textareas when you need to collect multi-line text input from users.
        They should be sized appropriately for the expected content length and can
        optionally be resizable.
      </p>
    </Section>

    <Section title="Anatomy">
      <AnatomyBlock
        items={[
          { number: 1, label: "Label", required: true, description: "Identifies the purpose of the textarea" },
          { number: 2, label: "Input area", required: true, description: "The multi-line text entry field" },
          { number: 3, label: "Placeholder", required: false, description: "Hint text that disappears when typing begins" },
          { number: 4, label: "Helper text", required: false, description: "Additional guidance or character count" },
        ]}
      >
        <div className="w-72 space-y-1.5 relative">
          <div className="relative inline-block">
            <Label>Description</Label>
            <AnatomyMarker number={1} className="absolute -right-7 top-1/2 -translate-y-1/2" />
          </div>
          <div className="relative">
            <Textarea placeholder="Enter a description..." className="min-h-[80px]" />
            <AnatomyMarker number={2} className="absolute -right-7 top-4" />
            <AnatomyMarker number={3} className="absolute left-24 top-3" />
          </div>
          <div className="relative inline-block">
            <p className="text-xs text-foreground-muted">0/500 characters</p>
            <AnatomyMarker number={4} className="absolute -right-7 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </AnatomyBlock>
    </Section>

    <Section title="Types">
      <div className="space-y-6">
        <div className="p-6 bg-surface-elevated rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Basic textarea</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Standard multi-line text input.
          </p>
          <div className="space-y-2">
            <Label htmlFor="basic-textarea">Message</Label>
            <Textarea id="basic-textarea" placeholder="Type your message here..." />
          </div>
        </div>

        <div className="p-6 bg-surface-elevated rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">With character count</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Shows remaining characters when there's a limit.
          </p>
          <div className="space-y-2">
            <Label htmlFor="char-textarea">Bio</Label>
            <Textarea id="char-textarea" placeholder="Tell us about yourself..." maxLength={280} />
            <p className="text-xs text-foreground-muted text-right">0/280 characters</p>
          </div>
        </div>

        <div className="p-6 bg-surface-elevated rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Fixed size</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Non-resizable textarea with fixed dimensions.
          </p>
          <div className="space-y-2">
            <Label htmlFor="fixed-textarea">Notes</Label>
            <Textarea id="fixed-textarea" placeholder="Add notes..." className="resize-none h-24" />
          </div>
        </div>

        <div className="p-6 bg-surface-elevated rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Disabled</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Textarea in disabled state.
          </p>
          <div className="space-y-2">
            <Label htmlFor="disabled-textarea">Comments</Label>
            <Textarea id="disabled-textarea" placeholder="Comments disabled" disabled />
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const TextareaUsage = () => (
  <div className="space-y-12">
    <Section title="When to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>For multi-line text entry like comments, descriptions, or messages</li>
        <li>When the expected input is longer than a single line</li>
        <li>For free-form text without specific formatting requirements</li>
        <li>When users need to see multiple lines of their input at once</li>
      </ul>
    </Section>

    <Section title="When not to use">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li>For single-line input like names or emails (use Input)</li>
        <li>For structured data entry (use appropriate form controls)</li>
        <li>For rich text with formatting (use a rich text editor)</li>
        <li>For code input (use a code editor component)</li>
      </ul>
    </Section>

    <Section title="Best practices">
      <div className="grid md:grid-cols-2 gap-6">
        <VisualExample type="do" caption="Size the textarea to match expected content length">
          <div className="w-64 space-y-2">
            <Label>Short feedback</Label>
            <Textarea placeholder="Brief comment..." className="h-20" />
          </div>
        </VisualExample>
        <VisualExample type="dont" caption="Don't use oversized textareas for short content">
          <div className="w-64 space-y-2">
            <Label>Short feedback</Label>
            <Textarea placeholder="Brief comment..." className="h-40" />
          </div>
        </VisualExample>
        <VisualExample type="do" caption="Show character count when there's a limit">
          <div className="w-64 space-y-2">
            <Label>Tweet</Label>
            <Textarea placeholder="What's happening?" className="h-20" />
            <p className="text-xs text-foreground-muted text-right">0/280</p>
          </div>
        </VisualExample>
        <VisualExample type="dont" caption="Don't hide limits until users exceed them">
          <div className="w-64 space-y-2">
            <Label>Tweet</Label>
            <Textarea placeholder="What's happening?" className="h-20" />
          </div>
        </VisualExample>
      </div>
    </Section>
  </div>
);

const TextareaSpecifications = () => (
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
            <tr><td className="px-4 py-3 font-mono text-foreground">value</td><td className="px-4 py-3 text-foreground-secondary">""</td><td className="px-4 py-3 text-foreground-secondary">Current text content</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">placeholder</td><td className="px-4 py-3 text-foreground-secondary">undefined</td><td className="px-4 py-3 text-foreground-secondary">Hint text</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">disabled</td><td className="px-4 py-3 text-foreground-secondary">false</td><td className="px-4 py-3 text-foreground-secondary">Prevents interaction</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">rows</td><td className="px-4 py-3 text-foreground-secondary">3</td><td className="px-4 py-3 text-foreground-secondary">Visible lines</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">maxLength</td><td className="px-4 py-3 text-foreground-secondary">undefined</td><td className="px-4 py-3 text-foreground-secondary">Character limit</td></tr>
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
            <tr><td className="px-4 py-3 text-foreground">Min height</td><td className="px-4 py-3 font-mono text-foreground-secondary">80px (approx 3 rows)</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Padding</td><td className="px-4 py-3 font-mono text-foreground-secondary">12px horizontal, 8px vertical</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Border radius</td><td className="px-4 py-3 font-mono text-foreground-secondary">6px</td></tr>
            <tr><td className="px-4 py-3 text-foreground">Resize handle</td><td className="px-4 py-3 font-mono text-foreground-secondary">Vertical only (default)</td></tr>
          </tbody>
        </table>
      </div>
    </Section>
  </div>
);

const TextareaInteractions = () => (
  <div className="space-y-12">
    <Section title="States preview">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Default", props: {} },
          { label: "Focus", props: { className: "ring-2 ring-ring ring-offset-2 ring-offset-background" } },
          { label: "Filled", props: { defaultValue: "Some content here..." } },
          { label: "Disabled", props: { disabled: true, placeholder: "Disabled" } },
        ].map((state) => (
          <div key={state.label} className="p-4 bg-surface-elevated rounded-lg border border-border-glass">
            <p className="text-xs text-foreground-muted mb-3 text-center">{state.label}</p>
            <Textarea placeholder="Placeholder..." className={`h-16 ${state.props.className || ''}`} {...state.props} />
          </div>
        ))}
      </div>
    </Section>

    <Section title="Interaction behavior">
      <InteractionTable
        states={[
          { state: "default", trigger: "Initial render", visual: "Empty with placeholder visible", a11y: "Labelled by associated label" },
          { state: "hover", trigger: "Mouse over", visual: "Border color intensifies", a11y: "Cursor changes to text" },
          { state: "focus", trigger: "Click / Tab", visual: "Focus ring, placeholder fades", a11y: "Ready for input" },
          { state: "typing", trigger: "Key input", visual: "Text appears, placeholder hidden", a11y: "Live content updates" },
          { state: "error", trigger: "Validation fails", visual: "Red border, error message below", a11y: "aria-invalid='true', error announced" },
          { state: "disabled", trigger: "disabled prop", visual: "Reduced opacity, no resize", a11y: "aria-disabled='true'" },
        ]}
      />
    </Section>
  </div>
);

const TextareaAccessibility = () => (
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
            <tr><td className="px-4 py-3 font-mono text-foreground">Tab</td><td className="px-4 py-3 text-foreground-secondary">Move focus to/from textarea</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Enter</td><td className="px-4 py-3 text-foreground-secondary">Insert new line</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Ctrl/Cmd + A</td><td className="px-4 py-3 text-foreground-secondary">Select all text</td></tr>
            <tr><td className="px-4 py-3 font-mono text-foreground">Arrow keys</td><td className="px-4 py-3 text-foreground-secondary">Navigate within text</td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="ARIA attributes">
      <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">aria-labelledby</code> - References the label element</li>
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">aria-describedby</code> - References helper text or error</li>
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">aria-invalid</code> - Indicates validation error</li>
        <li><code className="text-sm bg-surface-elevated px-1.5 py-0.5 rounded">aria-required</code> - Indicates required field</li>
      </ul>
    </Section>

    <Section title="Screen reader behavior">
      <p className="text-foreground-secondary">
        Screen readers announce the label, current value, and any associated helper text.
        Character limits and validation errors should be announced when relevant.
        Use aria-live regions for dynamic character count updates.
      </p>
    </Section>
  </div>
);

const TextareaCode = () => (
  <div className="space-y-12">
    <Section title="Basic usage">
      <CodeBlock
        code={`import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Type your message..." />
</div>`}
        language="tsx"
      />
    </Section>

    <Section title="Controlled with character count">
      <CodeBlock
        code={`const [value, setValue] = useState("")
const maxLength = 280

<div className="space-y-2">
  <Label htmlFor="bio">Bio</Label>
  <Textarea
    id="bio"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    maxLength={maxLength}
    placeholder="Tell us about yourself..."
  />
  <p className="text-xs text-muted-foreground text-right">
    {value.length}/{maxLength} characters
  </p>
</div>`}
        language="tsx"
      />
    </Section>

    <Section title="With validation">
      <CodeBlock
        code={`import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
})

const { register, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})

<div className="space-y-2">
  <Label htmlFor="description">Description</Label>
  <Textarea 
    id="description"
    {...register("description")}
    aria-invalid={!!errors.description}
  />
  {errors.description && (
    <p className="text-sm text-destructive">{errors.description.message}</p>
  )}
</div>`}
        language="tsx"
      />
    </Section>
  </div>
);

const TextareaTokens = () => (
  <div className="space-y-12">
    <Section title="Text tokens">
      <TokenTableWithPreview tokens={[
        { token: '--foreground', state: 'default, hover, focus, filled', usage: 'Textarea value and label text' },
        { token: '--foreground-muted', state: 'default', usage: 'Placeholder and character count' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Text when disabled' },
        { token: '--error', state: 'error', usage: 'Error message text' },
      ]} />
    </Section>

    <Section title="Surface tokens">
      <TokenTableWithPreview tokens={[
        { token: '--input', state: 'default, hover', usage: 'Textarea background' },
        { token: '--input-background', state: 'focus', usage: 'Focus state background' },
        { token: '--muted', state: 'disabled', usage: 'Disabled textarea background' },
      ]} />
    </Section>

    <Section title="Stroke tokens">
      <TokenTableWithPreview tokens={[
        { token: '--border', state: 'default', usage: 'Textarea border' },
        { token: '--border-strong', state: 'hover, focus', usage: 'Hover and focus border' },
        { token: '--error', state: 'error', usage: 'Error state border' },
        { token: '--ring', state: 'focus', usage: 'Focus ring color' },
      ]} />
    </Section>

    <Section title="Graphic tokens">
      <p className="text-foreground-secondary text-sm">
        Textarea component does not use graphic tokens as it is a text-only input element.
      </p>
    </Section>

    <Section title="Contrast compliance">
      <div className="p-4 bg-surface-elevated rounded-xl border border-border-glass">
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground-secondary">
          <li>Textarea text meets WCAG AA 4.5:1 contrast ratio against background</li>
          <li>Placeholder text meets minimum 3:1 contrast for non-text elements</li>
          <li>Focus ring provides minimum 3:1 contrast against adjacent colors</li>
          <li>Error text and border meet AA contrast requirements</li>
        </ul>
      </div>
    </Section>
  </div>
);

const TextareaPage = () => {
  const tabs = [
    { id: "overview", label: "Overview", content: <TextareaOverview /> },
    { id: "usage", label: "Usage", content: <TextareaUsage /> },
    { id: "specifications", label: "Specifications", content: <TextareaSpecifications /> },
    { id: "tokens", label: "Tokens", content: <TextareaTokens /> },
    { id: "interactions", label: "Interactions", content: <TextareaInteractions /> },
    { id: "accessibility", label: "Accessibility", content: <TextareaAccessibility /> },
    { id: "code", label: "Code", content: <TextareaCode /> },
  ];

  return (
    <DocLayout>
      <PageHeader
        title="Textarea"
        description="Textareas allow users to enter and edit multi-line text content."
      />
      <DocTabs tabs={tabs} />
    </DocLayout>
  );
};

export default TextareaPage;
