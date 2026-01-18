import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { DocTabs } from "@/components/docs/DocTabs";
import { AnatomyBlock, AnatomyMarker } from "@/components/docs/AnatomyBlock";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { TokenTableWithPreview } from "@/components/docs/TokenTableWithPreview";
import { Check, X, Search, Mail, Eye, EyeOff } from "lucide-react";

// Interaction table component for consistent state documentation
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

// Visual example block with Do/Don't indicator - dark background
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

const InputOverview = () => (
  <div className="space-y-12">
    <Section
      title="Description"
      description="Input fields allow users to enter and edit text. They are essential for forms, search, and any data entry interaction."
    >
      <p className="text-foreground-secondary">
        Text inputs are the most common form element. They should be clearly
        labeled, provide appropriate feedback, and guide users through data entry.
      </p>
    </Section>

    <Section title="Anatomy">
      <AnatomyBlock
        items={[
          { number: 1, label: "Label", required: true, description: "Identifies the input purpose. Always visible, never rely on placeholder alone" },
          { number: 2, label: "Input field", required: true, description: "The container where users type. Should have clear boundaries" },
          { number: 3, label: "Placeholder", required: false, description: "Hint text that disappears on focus. Not a replacement for labels" },
          { number: 4, label: "Helper text", required: false, description: "Additional guidance below the input. Persists during interaction" },
        ]}
      >
        <div className="w-72 space-y-1.5 relative">
          {/* Label with marker */}
          <div className="relative inline-block">
            <label className="block text-sm font-medium text-foreground">
              Email address
            </label>
            <AnatomyMarker number={1} className="absolute -right-7 top-1/2 -translate-y-1/2" />
          </div>
          {/* Input with markers */}
          <div className="relative">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-foreground-muted"
            />
            <AnatomyMarker number={2} className="absolute -right-7 top-1/2 -translate-y-1/2" />
            <AnatomyMarker number={3} className="absolute left-20 top-1/2 -translate-y-1/2 -translate-x-1/2" />
          </div>
          {/* Helper text with marker */}
          <div className="relative inline-block">
            <p className="text-xs text-foreground-muted">
              We will never share your email
            </p>
            <AnatomyMarker number={4} className="absolute -right-7 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </AnatomyBlock>
    </Section>

    <Section title="Types">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-background-surface rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4">Text</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            General purpose text entry for names, titles, descriptions.
          </p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-foreground-muted"
            />
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4">Email</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Validates email format, shows email keyboard on mobile.
          </p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-foreground-muted"
            />
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4">Password</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Masks input by default, typically includes show/hide toggle.
          </p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-foreground-muted"
            />
          </div>
        </div>
      </div>
    </Section>

    <Section title="Sub-types">
      <p className="text-foreground-secondary mb-6">
        Inputs support multiple content configurations with consistent spacing and alignment.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-background-surface rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4">Text Only</h4>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-foreground-muted"
            />
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4">Left Icon + Text</h4>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-foreground-muted"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4">Right Icon + Text</h4>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password"
                className="w-full pl-3 pr-10 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-foreground-muted"
              />
              <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted cursor-pointer hover:text-foreground" />
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section title="Interaction states">
      <p className="text-foreground-secondary mb-6">
        All input types follow consistent state naming: default, hover, focus, active, disabled, and loading.
      </p>
      <InteractionTable
        states={[
          { state: "default", trigger: "Initial render", visual: "Base border color, subtle background", a11y: "Focusable, enabled state" },
          { state: "hover", trigger: "Mouse enters input", visual: "Border color slightly stronger", a11y: "Cursor changes to text cursor" },
          { state: "focus", trigger: "Click or Tab", visual: "2px ring with offset, border highlighted", a11y: "Focus ring meets WCAG 2.2 (3:1 contrast)" },
          { state: "active", trigger: "User is typing", visual: "Focus styling maintained", a11y: "Input is editable, value updates" },
          { state: "disabled", trigger: "disabled attribute", visual: "Muted background, reduced opacity", a11y: "Removed from tab order, cursor not-allowed" },
          { state: "error", trigger: "Validation failure", visual: "Error border color, error text below", a11y: "aria-invalid=true, error announced" },
        ]}
      />
      
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-background-surface rounded-lg border border-border">
          <p className="text-xs text-foreground-muted mb-3">default</p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Label</label>
            <input
              type="text"
              placeholder="Placeholder text"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-foreground-muted"
            />
          </div>
        </div>

        <div className="p-4 bg-background-surface rounded-lg border border-border">
          <p className="text-xs text-foreground-muted mb-3">hover</p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Label</label>
            <input
              type="text"
              placeholder="Placeholder text"
              className="w-full px-3 py-2 bg-input border border-border-strong rounded-md text-sm text-foreground placeholder:text-foreground-muted"
            />
          </div>
        </div>

        <div className="p-4 bg-background-surface rounded-lg border border-border">
          <p className="text-xs text-foreground-muted mb-3">focus</p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Label</label>
            <input
              type="text"
              placeholder="Placeholder text"
              className="w-full px-3 py-2 bg-input-focus border border-border-strong rounded-md text-sm text-foreground placeholder:text-foreground-muted ring-2 ring-accent ring-offset-2 ring-offset-background-surface"
            />
          </div>
        </div>

        <div className="p-4 bg-background-surface rounded-lg border border-border">
          <p className="text-xs text-foreground-muted mb-3">filled</p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Label</label>
            <input
              type="text"
              defaultValue="Entered value"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground"
            />
          </div>
        </div>

        <div className="p-4 bg-background-surface rounded-lg border border-border">
          <p className="text-xs text-foreground-muted mb-3">error</p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Label</label>
            <input
              type="text"
              defaultValue="Invalid input"
              className="w-full px-3 py-2 bg-input border-2 border-error rounded-md text-sm text-foreground"
            />
            <p className="text-xs text-error">This field is required</p>
          </div>
        </div>

        <div className="p-4 bg-background-surface rounded-lg border border-border">
          <p className="text-xs text-foreground-muted mb-3">disabled</p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground-disabled">Label</label>
            <input
              type="text"
              placeholder="Cannot edit"
              disabled
              className="w-full px-3 py-2 bg-muted border border-border rounded-md text-sm text-foreground-disabled placeholder:text-foreground-disabled cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const InputUsage = () => (
  <div className="space-y-12">
    <Section title="Label placement">
      <div className="space-y-4 text-foreground-secondary">
        <p>
          <strong className="text-foreground">Always place labels above inputs.</strong> This
          provides consistent alignment and scanning patterns, especially in forms
          with varying input widths.
        </p>
        <p>
          Labels should be concise but descriptive. Avoid ending labels with colons.
        </p>
        <p>
          For required fields, consider using "(required)" suffix or asterisk with
          a legend explaining the notation.
        </p>
      </div>
    </Section>

    <Section title="Placeholder usage">
      <div className="space-y-4 text-foreground-secondary">
        <p>
          <strong className="text-foreground">Placeholders are supplementary, not substitutes for labels.</strong> They
          disappear when users start typing, losing important context.
        </p>
        <p>
          Use placeholders for format hints (e.g., "DD/MM/YYYY") or examples,
          not for critical information.
        </p>
        <p>
          Ensure placeholder text has sufficient contrast for readability while
          still appearing lighter than entered text.
        </p>
      </div>
    </Section>

    <Section title="Helper text vs error text">
      <div className="space-y-6">
        <div className="p-6 bg-background-surface rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4">Helper text</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Provides additional guidance before errors occur. Always visible.
          </p>
          <div className="space-y-2 max-w-sm">
            <label className="block text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground"
            />
            <p className="text-xs text-foreground-muted">Must be at least 8 characters</p>
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4">Error text</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Replaces helper text when validation fails. Explains how to fix the error.
          </p>
          <div className="space-y-2 max-w-sm">
            <label className="block text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              defaultValue="short"
              className="w-full px-3 py-2 bg-input border-2 border-error rounded-md text-sm text-foreground"
            />
            <p className="text-xs text-error">Password must be at least 8 characters</p>
          </div>
        </div>
      </div>
    </Section>

    <Section title="Do's and Don'ts">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Label usage */}
        <VisualExample
          type="do"
          caption="Always use a visible label above the input field. Labels help users understand what information is required."
        >
          <div className="space-y-2 w-64">
            <label className="block text-sm font-medium text-neutral-900">Email Address</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
        </VisualExample>
        <VisualExample
          type="dont"
          caption="Do not use placeholder text as the only label. Placeholders disappear when users start typing, causing confusion."
        >
          <div className="space-y-2 w-64">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
        </VisualExample>

        {/* Error messages */}
        <VisualExample
          type="do"
          caption="Provide specific, actionable error messages that help users understand how to fix the issue."
        >
          <div className="space-y-2 w-64">
            <label className="block text-sm font-medium text-neutral-900">Email</label>
            <input
              type="email"
              defaultValue="invalid-email"
              className="w-full px-3 py-2 bg-white border-2 border-red-500 rounded-md text-sm text-neutral-900"
            />
            <p className="text-xs text-red-500">Enter a valid email (e.g., name@example.com)</p>
          </div>
        </VisualExample>
        <VisualExample
          type="dont"
          caption="Avoid generic error messages that do not help users understand what went wrong or how to fix it."
        >
          <div className="space-y-2 w-64">
            <label className="block text-sm font-medium text-neutral-900">Email</label>
            <input
              type="email"
              defaultValue="invalid-email"
              className="w-full px-3 py-2 bg-white border-2 border-red-500 rounded-md text-sm text-neutral-900"
            />
            <p className="text-xs text-red-500">Invalid input</p>
          </div>
        </VisualExample>

        {/* Input width */}
        <VisualExample
          type="do"
          caption="Match input width to the expected content length. Shorter inputs for phone numbers, wider for addresses."
        >
          <div className="space-y-4 w-full">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-900">ZIP Code</label>
              <input
                type="text"
                placeholder="12345"
                className="w-24 px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>
        </VisualExample>
        <VisualExample
          type="dont"
          caption="Avoid using full-width inputs for short content. This creates visual imbalance and poor user experience."
        >
          <div className="space-y-4 w-full">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-900">ZIP Code</label>
              <input
                type="text"
                placeholder="12345"
                className="w-64 px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>
        </VisualExample>

        {/* Icon usage */}
        <VisualExample
          type="do"
          caption="Use icons to clarify input purpose. Search icon for search fields, email icon for email inputs."
        >
          <div className="space-y-2 w-64">
            <label className="block text-sm font-medium text-neutral-900">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>
        </VisualExample>
        <VisualExample
          type="dont"
          caption="Avoid using decorative icons that do not add meaning or clarity to the input field."
        >
          <div className="space-y-2 w-64">
            <label className="block text-sm font-medium text-neutral-900">Name</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">★</span>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full pl-10 pr-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>
        </VisualExample>
      </div>
    </Section>

    <Section title="Placement examples">
      <p className="text-foreground-secondary mb-6">
        Input fields should be placed thoughtfully within forms to create clear visual hierarchy and logical flow.
      </p>
      <div className="space-y-6">
        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Vertical form layout</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Stack inputs vertically with consistent spacing (16px). Labels above inputs for better scanning.
          </p>
          <div className="p-4 border border-border rounded-lg bg-background-elevated max-w-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">First name</label>
                <div className="h-10 bg-input border border-border rounded-md"></div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Last name</label>
                <div className="h-10 bg-input border border-border rounded-md"></div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="h-10 bg-input border border-border rounded-md"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Inline layout</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Use inline layouts for related short inputs like date ranges or name fields.
          </p>
          <div className="p-4 border border-border rounded-lg bg-background-elevated">
            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium text-foreground">Start date</label>
                <div className="h-10 bg-input border border-border rounded-md"></div>
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium text-foreground">End date</label>
                <div className="h-10 bg-input border border-border rounded-md"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">With helper text</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Helper text appears below the input with reduced spacing (4px).
          </p>
          <div className="p-4 border border-border rounded-lg bg-background-elevated max-w-sm">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="h-10 bg-input border border-border rounded-md"></div>
              <p className="text-xs text-foreground-muted">Must be at least 8 characters</p>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section title="Component alternatives">
      <p className="text-foreground-secondary mb-6">
        Choose the right input type based on the data being collected.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Use case</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Use Input</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Use Alternative</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="px-4 py-3 text-foreground">Long text (multiple lines)</td>
              <td className="px-4 py-3 text-foreground-secondary">No</td>
              <td className="px-4 py-3 text-foreground-secondary">Use <code className="text-accent">Textarea</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Select from predefined options</td>
              <td className="px-4 py-3 text-foreground-secondary">No</td>
              <td className="px-4 py-3 text-foreground-secondary">Use <code className="text-accent">Select</code> or <code className="text-accent">Dropdown</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Date selection</td>
              <td className="px-4 py-3 text-foreground-secondary">No</td>
              <td className="px-4 py-3 text-foreground-secondary">Use <code className="text-accent">DatePicker</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Numeric range selection</td>
              <td className="px-4 py-3 text-foreground-secondary">No</td>
              <td className="px-4 py-3 text-foreground-secondary">Use <code className="text-accent">Slider</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Search with autocomplete</td>
              <td className="px-4 py-3 text-foreground-secondary">Partial</td>
              <td className="px-4 py-3 text-foreground-secondary">Use <code className="text-accent">Combobox</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Short text entry</td>
              <td className="px-4 py-3 text-foreground-secondary">Yes</td>
              <td className="px-4 py-3 text-foreground-secondary">—</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Email, password, phone</td>
              <td className="px-4 py-3 text-foreground-secondary">Yes</td>
              <td className="px-4 py-3 text-foreground-secondary">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  </div>
);

const InputAccessibility = () => (
  <div className="space-y-12">
    <Section
      title="Label association"
      description="Every input must have a programmatically associated label."
    >
      <div className="space-y-4 text-foreground-secondary">
        <p>
          Use the <code>for</code> attribute on <code>&lt;label&gt;</code> elements
          that matches the <code>id</code> of the input.
        </p>
        <p>
          Alternatively, wrap the input inside the <code>&lt;label&gt;</code> element.
        </p>
        <p>
          Never use <code>aria-label</code> as a replacement for visible labels
          unless the visual design explicitly requires it.
        </p>
      </div>
      <CodeBlock
        language="html"
        code={`<!-- Method 1: for/id association -->
<label for="email">Email address</label>
<input type="email" id="email" name="email">

<!-- Method 2: Wrapping -->
<label>
  Email address
  <input type="email" name="email">
</label>`}
      />
    </Section>

    <Section title="Focus visibility (WCAG compliant)">
      <p className="text-foreground-secondary mb-4">
        Focus indicators must meet WCAG 2.2 requirements. The focus ring should have at least 2px width, 
        sufficient contrast (3:1 minimum) against the background, and not rely on color alone.
      </p>
      <div className="p-6 bg-background-surface rounded-lg border border-border">
        <div className="space-y-2 max-w-sm">
          <label className="block text-sm font-medium text-foreground">Focused Input</label>
          <input
            type="text"
            placeholder="Focus visible"
            className="w-full px-3 py-2 bg-input-focus border border-border-strong rounded-md text-sm text-foreground placeholder:text-foreground-muted ring-2 ring-accent ring-offset-2 ring-offset-background-surface"
          />
        </div>
      </div>
    </Section>

    <Section title="Error announcement">
      <div className="space-y-4 text-foreground-secondary">
        <p>
          Error messages must be announced to screen readers when they appear.
          Use <code>aria-describedby</code> to associate error text with the input.
        </p>
        <p>
          Use <code>aria-invalid="true"</code> when the input contains an error.
        </p>
        <p>
          Consider using <code>role="alert"</code> or <code>aria-live="polite"</code>
          on error messages for immediate announcement.
        </p>
      </div>
      <CodeBlock
        language="html"
        code={`<label for="email">Email address</label>
<input 
  type="email" 
  id="email" 
  aria-invalid="true"
  aria-describedby="email-error"
>
<p id="email-error" role="alert">
  Enter a valid email address
</p>`}
      />
    </Section>

    <Section
      title="Keyboard navigation"
      description="Inputs must be accessible via keyboard navigation."
    >
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
                Key
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Tab</td>
              <td className="px-4 py-3 text-foreground-secondary">
                Move focus to the input
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Shift + Tab</td>
              <td className="px-4 py-3 text-foreground-secondary">
                Move focus to previous element
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Arrow keys</td>
              <td className="px-4 py-3 text-foreground-secondary">
                Move cursor within text
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="Required vs optional fields">
      <div className="space-y-4 text-foreground-secondary">
        <p>
          Mark required fields with visual and programmatic indicators. Use
          <code>required</code> attribute or <code>aria-required="true"</code>.
        </p>
        <p>
          If most fields are required, mark optional fields instead to reduce noise.
        </p>
        <p>
          Always indicate required fields before users attempt to submit.
        </p>
      </div>
    </Section>
  </div>
);

const InputCode = () => (
  <div className="space-y-12">
    <Section title="HTML">
      <CodeBlock
        language="html"
        title="input.html"
        code={`<!-- Basic text input -->
<div class="input-group">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Enter your name">
</div>

<!-- With left icon -->
<div class="input-group">
  <label for="search">Search</label>
  <div class="input-wrapper">
    <svg class="icon icon-left">...</svg>
    <input type="text" id="search" name="search" placeholder="Search...">
  </div>
</div>

<!-- With right icon -->
<div class="input-group">
  <label for="password">Password</label>
  <div class="input-wrapper">
    <input type="password" id="password" name="password">
    <button type="button" class="icon icon-right" aria-label="Toggle password">
      <svg>...</svg>
    </button>
  </div>
</div>

<!-- Error state -->
<div class="input-group">
  <label for="email">Email</label>
  <input 
    type="email" 
    id="email" 
    aria-invalid="true"
    aria-describedby="email-error"
  >
  <p id="email-error" class="error-text" role="alert">
    Enter a valid email address
  </p>
</div>

<!-- Disabled state -->
<div class="input-group">
  <label for="disabled">Disabled</label>
  <input type="text" id="disabled" disabled value="Cannot edit">
</div>`}
      />
    </Section>

    <Section title="CSS">
      <CodeBlock
        language="css"
        title="input.css"
        code={`.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--foreground));
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
}

.icon-left {
  position: absolute;
  left: 0.75rem;
  color: hsl(var(--foreground-muted));
}

.icon-right {
  position: absolute;
  right: 0.75rem;
  color: hsl(var(--foreground-muted));
}

input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background-color: hsl(var(--input));
  color: hsl(var(--foreground));
  transition: all 0.15s ease;
}

input:focus {
  outline: none;
  border-color: hsl(var(--border-strong));
  box-shadow: 0 0 0 2px hsl(var(--ring));
}

input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: hsl(var(--muted));
}

input[aria-invalid="true"] {
  border-color: hsl(var(--error));
  border-width: 2px;
}

.error-text {
  font-size: 0.75rem;
  color: hsl(var(--error));
}`}
      />
    </Section>

    <Section title="React">
      <CodeBlock
        language="tsx"
        title="Input.tsx"
        code={`import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || label.toLowerCase().replace(/\\s/g, "-");
  const errorId = \`\${inputId}-error\`;
  
  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor={inputId}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>
      
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">
            {leftIcon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full px-3 py-2 bg-input border border-border rounded-md",
            "text-sm text-foreground placeholder:text-foreground-muted",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-border-strong",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-error border-2",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted">
            {rightIcon}
          </span>
        )}
      </div>
      
      {error && (
        <p id={errorId} className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="text-xs text-foreground-muted">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";`}
      />
    </Section>

    <Section title="Usage examples">
      <CodeBlock
        language="tsx"
        title="Examples.tsx"
        code={`// Basic input
<Input label="Username" placeholder="Enter username" />

// With left icon
<Input 
  label="Search" 
  placeholder="Search..." 
  leftIcon={<SearchIcon />} 
/>

// With right icon (password toggle)
<Input 
  label="Password" 
  type="password"
  rightIcon={<EyeIcon onClick={toggleVisibility} />} 
/>

// Error state
<Input 
  label="Email" 
  type="email"
  error="Enter a valid email address" 
/>

// With helper text
<Input 
  label="Password" 
  type="password"
  helperText="Must be at least 8 characters" 
/>

// Disabled
<Input label="Read Only" disabled value="Cannot edit" />`}
      />
    </Section>
  </div>
);

const InputSpecifications = () => (
  <div className="space-y-12">
    <Section title="Default properties">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Property</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Default value</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">type</td>
              <td className="px-4 py-3 font-mono text-accent">"text"</td>
              <td className="px-4 py-3 text-foreground-secondary">HTML input type</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">disabled</td>
              <td className="px-4 py-3 font-mono text-accent">false</td>
              <td className="px-4 py-3 text-foreground-secondary">Disables interaction</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">required</td>
              <td className="px-4 py-3 font-mono text-accent">false</td>
              <td className="px-4 py-3 text-foreground-secondary">Marks field as required</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">autoComplete</td>
              <td className="px-4 py-3 font-mono text-accent">"off"</td>
              <td className="px-4 py-3 text-foreground-secondary">Browser autocomplete behavior</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="Anatomy reference">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Part</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Element</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Required</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Label</td>
              <td className="px-4 py-3 text-foreground-secondary">&lt;label&gt; element</td>
              <td className="px-4 py-3 text-success">Yes</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Input field</td>
              <td className="px-4 py-3 text-foreground-secondary">&lt;input&gt; element</td>
              <td className="px-4 py-3 text-success">Yes</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Placeholder</td>
              <td className="px-4 py-3 text-foreground-secondary">Hint text</td>
              <td className="px-4 py-3 text-foreground-muted">Optional</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Helper text</td>
              <td className="px-4 py-3 text-foreground-secondary">Guidance text</td>
              <td className="px-4 py-3 text-foreground-muted">Optional</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Icon</td>
              <td className="px-4 py-3 text-foreground-secondary">SVG icon</td>
              <td className="px-4 py-3 text-foreground-muted">Optional</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="Size constraints">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Property</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Height</td>
              <td className="px-4 py-3 text-foreground-secondary">40px (h-10)</td>
              <td className="px-4 py-3 text-foreground-secondary">Fixed height</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Padding X</td>
              <td className="px-4 py-3 text-foreground-secondary">12px (px-3)</td>
              <td className="px-4 py-3 text-foreground-secondary">Standard horizontal padding</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Border radius</td>
              <td className="px-4 py-3 text-foreground-secondary">6px</td>
              <td className="px-4 py-3 text-foreground-secondary">Uses --radius-sm</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Min width</td>
              <td className="px-4 py-3 text-foreground-secondary">120px</td>
              <td className="px-4 py-3 text-foreground-secondary">Minimum recommended width</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="Fixed behaviors">
      <div className="space-y-4 text-foreground-secondary">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
            <span><strong className="text-foreground">Focus ring:</strong> Always visible on focus, 2px width with offset</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
            <span><strong className="text-foreground">Error state:</strong> Red border, error text below input</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
            <span><strong className="text-foreground">Disabled state:</strong> 50% opacity, cursor not-allowed</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
            <span><strong className="text-foreground">Placeholder:</strong> Lower contrast than input text</span>
          </li>
        </ul>
      </div>
    </Section>

    <Section title="Non-customizable rules">
      <div className="p-4 bg-warning-muted border border-warning-border rounded-lg">
        <ul className="space-y-2 text-sm text-foreground-secondary">
          <li>• Input height is fixed at 40px</li>
          <li>• Labels must always be visible (no placeholder-only inputs)</li>
          <li>• Error messages replace helper text, never show both</li>
          <li>• Focus ring color is always the accent color</li>
          <li>• Icon position is fixed (left or right, not both)</li>
        </ul>
      </div>
    </Section>
  </div>
);

const InputTokens = () => (
  <div className="space-y-12">
    <Section title="Text tokens">
      <TokenTableWithPreview tokens={[
        { token: '--foreground', state: 'default, hover, focus, filled', usage: 'Input value and label text' },
        { token: '--foreground-muted', state: 'default', usage: 'Placeholder and helper text' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Label and value when disabled' },
        { token: '--error', state: 'error', usage: 'Error message text' },
      ]} />
    </Section>

    <Section title="Surface tokens">
      <TokenTableWithPreview tokens={[
        { token: '--input', state: 'default, hover', usage: 'Input field background' },
        { token: '--input-background', state: 'focus', usage: 'Focus state background' },
        { token: '--muted', state: 'disabled', usage: 'Disabled input background' },
      ]} />
    </Section>

    <Section title="Stroke tokens">
      <TokenTableWithPreview tokens={[
        { token: '--border', state: 'default', usage: 'Input border' },
        { token: '--border-strong', state: 'hover, focus', usage: 'Hover and focus border' },
        { token: '--error', state: 'error', usage: 'Error state border' },
        { token: '--ring', state: 'focus', usage: 'Focus ring color' },
      ]} />
    </Section>

    <Section title="Graphic tokens">
      <TokenTableWithPreview tokens={[
        { token: '--foreground-muted', state: 'default', usage: 'Leading/trailing icon color' },
        { token: '--foreground', state: 'hover', usage: 'Icon hover color' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Icon when disabled' },
      ]} />
    </Section>

    <Section title="Contrast compliance">
      <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground-secondary">
          <li>Input text meets WCAG AA 4.5:1 contrast ratio against input background</li>
          <li>Placeholder text meets minimum 3:1 contrast for non-text elements</li>
          <li>Focus ring provides minimum 3:1 contrast against adjacent colors</li>
          <li>Error text and border meet AA contrast requirements for visibility</li>
        </ul>
      </div>
    </Section>
  </div>
);

const InputPage = () => {
  const tabs = [
    { id: "overview", label: "Overview", content: <InputOverview /> },
    { id: "usage", label: "Usage", content: <InputUsage /> },
    { id: "specifications", label: "Specifications", content: <InputSpecifications /> },
    { id: "tokens", label: "Tokens", content: <InputTokens /> },
    { id: "accessibility", label: "Accessibility", content: <InputAccessibility /> },
    { id: "code", label: "Code", content: <InputCode /> },
  ];

  return (
    <DocLayout>
      <PageHeader
        title="Input"
        description="Input fields allow users to enter and edit text."
      />
      <DocTabs tabs={tabs} />
    </DocLayout>
  );
};

export default InputPage;
