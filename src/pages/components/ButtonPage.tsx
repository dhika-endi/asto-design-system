import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { DocTabs } from "@/components/docs/DocTabs";
import { AnatomyBlock, AnatomyMarker } from "@/components/docs/AnatomyBlock";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { TokenTableWithPreview } from "@/components/docs/TokenTableWithPreview";
import { Check, X, ChevronRight, Download, Plus, Trash2, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const ButtonOverview = () => (
  <div className="space-y-12">
    <Section
      title="Description"
      description="Buttons trigger actions or navigate users through an interface. They are one of the most fundamental interactive elements."
    >
      <p className="text-foreground-secondary">
        Use buttons to enable users to take actions, make choices, or submit data.
        The button's visual weight should match its importance in the interface.
      </p>
    </Section>

    <Section title="Anatomy">
      <AnatomyBlock
        items={[
          { number: 1, label: "Icon", required: false, description: "Leading icon used to visually reinforce the button action" },
          { number: 2, label: "Label", required: true, description: "Text that describes the action. Should be concise and action-oriented" },
          { number: 3, label: "Container", required: true, description: "The interactive area that receives focus and click events" },
        ]}
      >
        <div className="relative inline-flex items-center">
          <Button className="relative">
            <Plus className="w-4 h-4" />
            Add item
          </Button>
          {/* Markers positioned next to elements */}
          <AnatomyMarker number={1} className="absolute -left-7 top-1/2 -translate-y-1/2" />
          <AnatomyMarker number={2} className="absolute left-1/2 -translate-x-1/2 -bottom-7" />
          <AnatomyMarker number={3} className="absolute -right-7 top-1/2 -translate-y-1/2" />
        </div>
      </AnatomyBlock>
    </Section>

    <Section title="Types">
      <div className="space-y-6">
        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Primary</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            High emphasis. Use for the main action on a page or in a form.
          </p>
          <Button>Primary Button</Button>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Secondary</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Medium emphasis. Use for secondary actions or when paired with a primary button.
          </p>
          <Button variant="secondary">Secondary Button</Button>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Tertiary</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Low emphasis. Use for tertiary actions or when visual weight needs to be minimal.
          </p>
          <Button variant="tertiary">Tertiary Button</Button>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Danger</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Destructive actions only. Ghost-like style with red text and icon. No background fill to reduce visual aggression while maintaining clarity.
          </p>
          <Button variant="danger">
            <Trash2 className="w-4 h-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </Section>

    <Section title="Sub-types">
      <p className="text-foreground-secondary mb-6">
        Each button type supports three sub-types for different content configurations. Maintain consistent spacing and alignment across all sub-types.
      </p>
      
      <div className="space-y-6">
        {/* Primary sub-types */}
        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Primary Sub-types</h4>
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-center">
              <Button>Text Only</Button>
              <p className="text-xs text-foreground-muted mt-2">Text only</p>
            </div>
            <div className="text-center">
              <Button><Plus className="w-4 h-4" />Left Icon</Button>
              <p className="text-xs text-foreground-muted mt-2">Left icon + text</p>
            </div>
            <div className="text-center">
              <Button>Right Icon<ChevronRight className="w-4 h-4" /></Button>
              <p className="text-xs text-foreground-muted mt-2">Right icon + text</p>
            </div>
          </div>
        </div>

        {/* Secondary sub-types */}
        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Secondary Sub-types</h4>
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-center">
              <Button variant="secondary">Text Only</Button>
              <p className="text-xs text-foreground-muted mt-2">Text only</p>
            </div>
            <div className="text-center">
              <Button variant="secondary"><Download className="w-4 h-4" />Left Icon</Button>
              <p className="text-xs text-foreground-muted mt-2">Left icon + text</p>
            </div>
            <div className="text-center">
              <Button variant="secondary">Right Icon<ChevronRight className="w-4 h-4" /></Button>
              <p className="text-xs text-foreground-muted mt-2">Right icon + text</p>
            </div>
          </div>
        </div>

        {/* Tertiary sub-types */}
        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Tertiary Sub-types</h4>
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-center">
              <Button variant="tertiary">Text Only</Button>
              <p className="text-xs text-foreground-muted mt-2">Text only</p>
            </div>
            <div className="text-center">
              <Button variant="tertiary"><Send className="w-4 h-4" />Left Icon</Button>
              <p className="text-xs text-foreground-muted mt-2">Left icon + text</p>
            </div>
            <div className="text-center">
              <Button variant="tertiary">Right Icon<ChevronRight className="w-4 h-4" /></Button>
              <p className="text-xs text-foreground-muted mt-2">Right icon + text</p>
            </div>
          </div>
        </div>

        {/* Danger sub-types */}
        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Danger Sub-types</h4>
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-center">
              <Button variant="danger">Text Only</Button>
              <p className="text-xs text-foreground-muted mt-2">Text only</p>
            </div>
            <div className="text-center">
              <Button variant="danger"><Trash2 className="w-4 h-4" />Left Icon</Button>
              <p className="text-xs text-foreground-muted mt-2">Left icon + text</p>
            </div>
            <div className="text-center">
              <Button variant="danger">Right Icon<ChevronRight className="w-4 h-4" /></Button>
              <p className="text-xs text-foreground-muted mt-2">Right icon + text</p>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section title="Sizes">
      <div className="flex items-end gap-4 p-6 bg-background-surface rounded-xl border border-border-glass">
        <div className="text-center">
          <Button size="sm">Small</Button>
          <p className="text-xs text-foreground-muted mt-2">36px height</p>
        </div>
        <div className="text-center">
          <Button>Medium</Button>
          <p className="text-xs text-foreground-muted mt-2">40px height</p>
        </div>
        <div className="text-center">
          <Button size="lg">Large</Button>
          <p className="text-xs text-foreground-muted mt-2">48px height</p>
        </div>
      </div>
    </Section>

    <Section title="Interaction states">
      <p className="text-foreground-secondary mb-6">
        All button types follow consistent state naming: default, hover, focus, active, disabled, and loading.
      </p>
      <InteractionTable
        states={[
          { state: "default", trigger: "Initial render", visual: "Base styling with normal opacity and shadow", a11y: "Focusable, enabled state" },
          { state: "hover", trigger: "Mouse enters button", visual: "Slightly darker background, enhanced shadow", a11y: "Cursor changes to pointer" },
          { state: "focus", trigger: "Tab or click", visual: "2px ring with offset, maintains visibility", a11y: "Focus ring meets WCAG 2.2 (3:1 contrast)" },
          { state: "active", trigger: "Mouse down or Enter/Space", visual: "Darker background, reduced shadow", a11y: "Immediate visual feedback" },
          { state: "disabled", trigger: "disabled attribute", visual: "50% opacity, no shadow", a11y: "Removed from tab order, cursor not-allowed" },
          { state: "loading", trigger: "Action in progress", visual: "Spinner icon, text changes", a11y: "aria-busy=true, aria-live announces" },
        ]}
      />
      
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
          <p className="text-xs text-foreground-muted mb-2">default (interactive)</p>
          <Button>Button</Button>
        </div>
        <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
          <p className="text-xs text-foreground-muted mb-2">hover (try it)</p>
          <Button>Hover Me</Button>
        </div>
        <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
          <p className="text-xs text-foreground-muted mb-2">focus (tab to it)</p>
          <Button>Focus Me</Button>
        </div>
        <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
          <p className="text-xs text-foreground-muted mb-2">active (click & hold)</p>
          <Button>Click Me</Button>
        </div>
        <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
          <p className="text-xs text-foreground-muted mb-2">disabled</p>
          <Button disabled>Button</Button>
        </div>
        <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
          <p className="text-xs text-foreground-muted mb-2">loading</p>
          <Button disabled>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading
          </Button>
        </div>
      </div>
    </Section>
  </div>
);

const ButtonUsage = () => (
  <div className="space-y-12">
    <Section title="When to use">
      <ul className="space-y-2 text-foreground-secondary">
        <li>To trigger an action, such as submitting a form</li>
        <li>To navigate to a new location within the application</li>
        <li>To open or close interface elements like modals or menus</li>
        <li>To toggle states or confirm decisions</li>
      </ul>
    </Section>

    <Section title="When not to use">
      <ul className="space-y-2 text-foreground-secondary">
        <li>For navigation to external URLs (use links instead)</li>
        <li>For inline text actions (use text links)</li>
        <li>For selection between options (use radio buttons or checkboxes)</li>
        <li>When the action is not immediately clear from the label</li>
      </ul>
    </Section>

    <Section title="Button hierarchy">
      <div className="space-y-4 text-foreground-secondary">
        <p>
          <strong className="text-foreground">Primary</strong> represents the
          main action on a page. There should typically be only one primary button
          visible at a time.
        </p>
        <p>
          <strong className="text-foreground">Secondary</strong> is for
          alternative actions. It has less visual weight and is often used
          alongside primary buttons.
        </p>
        <p>
          <strong className="text-foreground">Tertiary</strong> is for
          low-priority actions that should not compete with primary or secondary actions.
        </p>
        <p>
          <strong className="text-foreground">Danger</strong> is reserved exclusively
          for destructive actions like deleting data or irreversible operations.
        </p>
      </div>
    </Section>

    <Section title="Placement rules">
      <div className="space-y-4 text-foreground-secondary">
        <p>Place primary actions on the right side of button groups.</p>
        <p>Align buttons to the left in forms, to the right in dialogs.</p>
        <p>Maintain consistent spacing between buttons (8px or 16px).</p>
        <p>Stack buttons vertically on mobile when horizontal space is limited.</p>
      </div>
    </Section>

    <Section title="Do's and Don'ts">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Hierarchy */}
        <VisualExample
          type="do"
          caption="Use a combination of primary and secondary buttons to provide clear hierarchy in action. Use the color, size, and force that distinguishes the main buttons from the secondary button."
        >
          <div className="flex gap-3">
            <Button>Button</Button>
            <Button variant="secondary">Button</Button>
          </div>
        </VisualExample>
        <VisualExample
          type="dont"
          caption="Do not use a few primary buttons in one area without differentiation. This can confuse users and reduce clarity in decision making."
        >
          <div className="flex gap-3">
            <Button>Button</Button>
            <Button>Button</Button>
          </div>
        </VisualExample>

        {/* Text proportion */}
        <VisualExample
          type="do"
          caption="Make sure the proportion of the text and the length of the button accordingly, so that the text remains within the button limit and is easy to read."
        >
          <Button>Back to Home</Button>
        </VisualExample>
        <VisualExample
          type="dont"
          caption="Avoid text that is too long or small so that it exits the button, because it can reduce readability and interfere with user experience."
        >
          <Button size="sm" className="px-2 text-xs">Back to Home</Button>
        </VisualExample>

        {/* Single line text */}
        <VisualExample
          type="do"
          caption="Use a proportional text with the size of the button to keep it read clearly without changing the layout of the button."
        >
          <Button>Back to Home</Button>
        </VisualExample>
        <VisualExample
          type="dont"
          caption="Avoid separation of unnecessary lines in the button, because it can interfere with readability and reduce visual balance."
        >
          <Button className="text-center leading-tight w-24">Back to Home</Button>
        </VisualExample>

        {/* Title Case */}
        <VisualExample
          type="do"
          caption="Use Title Case for the text on the button, according to the reference at capitalizemytitle.com."
        >
          <Button>Back to Home</Button>
        </VisualExample>
        <VisualExample
          type="dont"
          caption="Avoid using lowercase letters at the beginning of the word in the button text, such as 'Back to home' or 'back to home'."
        >
          <Button>Back to home</Button>
        </VisualExample>

        {/* Icon usage */}
        <VisualExample
          type="do"
          caption="Use icons to reinforce meaning. Place left icons for actions, right icons for navigation or progression."
        >
          <Button><Download className="w-4 h-4" />Download</Button>
        </VisualExample>
        <VisualExample
          type="dont"
          caption="Avoid using decorative icons that do not add meaning or using icons without labels for non-obvious actions."
        >
          <Button size="icon"><Download className="w-4 h-4" /></Button>
        </VisualExample>
      </div>
    </Section>

    <Section title="Placement examples">
      <p className="text-foreground-secondary mb-6">
        Buttons should be placed thoughtfully within layouts to guide user attention and action flow.
      </p>
      <div className="space-y-6">
        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Form actions</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Primary action on the right, secondary on the left. Use consistent spacing (16px gap).
          </p>
          <div className="p-4 border border-border rounded-lg bg-background-elevated">
            <div className="space-y-4 max-w-sm">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="h-10 bg-input border border-border rounded-md"></div>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-border">
                <Button variant="secondary">Cancel</Button>
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Dialog actions</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Right-align buttons in dialogs. Destructive actions should use the danger variant.
          </p>
          <div className="p-4 border border-border rounded-lg bg-background-elevated max-w-md">
            <h5 className="font-medium text-foreground mb-2">Delete item?</h5>
            <p className="text-sm text-foreground-secondary mb-4">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary">Cancel</Button>
              <Button variant="danger"><Trash2 className="w-4 h-4" />Delete</Button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-background-surface rounded-xl border border-border-glass">
          <h4 className="font-medium text-foreground mb-4">Card actions</h4>
          <p className="text-sm text-foreground-secondary mb-4">
            Place actions at the bottom of cards with adequate spacing from content.
          </p>
          <div className="p-4 border border-border rounded-lg bg-background-elevated max-w-xs">
            <div className="h-24 bg-muted rounded-md mb-4"></div>
            <h5 className="font-medium text-foreground">Card title</h5>
            <p className="text-sm text-foreground-secondary mt-1 mb-4">Brief description of the content.</p>
            <Button className="w-full">View Details</Button>
          </div>
        </div>
      </div>
    </Section>

    <Section title="Component alternatives">
      <p className="text-foreground-secondary mb-6">
        Choose the right component based on the type of action and context.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border-glass">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Use case</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Use Button</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Use Alternative</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="px-4 py-3 text-foreground">Navigate to external URL</td>
              <td className="px-4 py-3 text-foreground-secondary">No</td>
              <td className="px-4 py-3 text-foreground-secondary">Use <code className="text-accent">Link</code> component</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Inline text action</td>
              <td className="px-4 py-3 text-foreground-secondary">No</td>
              <td className="px-4 py-3 text-foreground-secondary">Use <code className="text-accent">TextLink</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Toggle on/off state</td>
              <td className="px-4 py-3 text-foreground-secondary">No</td>
              <td className="px-4 py-3 text-foreground-secondary">Use <code className="text-accent">Switch</code> or <code className="text-accent">Toggle</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Select from options</td>
              <td className="px-4 py-3 text-foreground-secondary">No</td>
              <td className="px-4 py-3 text-foreground-secondary">Use <code className="text-accent">Radio</code> or <code className="text-accent">Checkbox</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Trigger action</td>
              <td className="px-4 py-3 text-foreground-secondary">Yes</td>
              <td className="px-4 py-3 text-foreground-secondary">—</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Submit form</td>
              <td className="px-4 py-3 text-foreground-secondary">Yes</td>
              <td className="px-4 py-3 text-foreground-secondary">—</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">Open modal/dialog</td>
              <td className="px-4 py-3 text-foreground-secondary">Yes</td>
              <td className="px-4 py-3 text-foreground-secondary">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  </div>
);

const ButtonAccessibility = () => (
  <div className="space-y-12">
    <Section
      title="Keyboard interaction"
      description="Buttons must be fully operable with keyboard alone."
    >
      <div className="overflow-hidden rounded-xl border border-border-glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-surface border-b border-border-glass">
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
                Move focus to the next interactive element
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Shift + Tab</td>
              <td className="px-4 py-3 text-foreground-secondary">
                Move focus to the previous interactive element
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Enter</td>
              <td className="px-4 py-3 text-foreground-secondary">
                Activate the focused button
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Space</td>
              <td className="px-4 py-3 text-foreground-secondary">
                Activate the focused button
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="Focus visibility (WCAG compliant)">
      <p className="text-foreground-secondary mb-4">
        Focus indicators must meet WCAG 2.2 requirements. The focus ring should have at least 2px width, 
        sufficient contrast (3:1 minimum) against the background, and not rely on color alone.
      </p>
      <div className="p-6 bg-background-surface rounded-xl border border-border-glass space-y-4">
        <div className="flex gap-4">
          <div className="text-center">
            <Button>Primary Focus</Button>
            <p className="text-xs text-foreground-muted mt-2">Primary (tab to test)</p>
          </div>
          <div className="text-center">
            <Button variant="secondary">Secondary Focus</Button>
            <p className="text-xs text-foreground-muted mt-2">Secondary (tab to test)</p>
          </div>
          <div className="text-center">
            <Button variant="danger"><Trash2 className="w-4 h-4" />Danger Focus</Button>
            <p className="text-xs text-foreground-muted mt-2">Danger (tab to test)</p>
          </div>
        </div>
      </div>
    </Section>

    <Section title="Contrast requirements">
      <div className="space-y-4 text-foreground-secondary">
        <p>
          Button text must have a minimum contrast ratio of 4.5:1 against the
          button background.
        </p>
        <p>
          The button container must have a minimum contrast ratio of 3:1 against
          adjacent backgrounds.
        </p>
        <p>
          Focus indicators must have a minimum contrast ratio of 3:1 against
          adjacent colors.
        </p>
      </div>
    </Section>

    <Section title="Disabled vs aria-disabled">
      <div className="space-y-4 text-foreground-secondary">
        <p>
          <code>disabled</code> removes the button from the tab order entirely.
          Users cannot interact with or focus the button.
        </p>
        <p>
          <code>aria-disabled="true"</code> keeps the button in the tab order
          but prevents activation. This is preferred when users need to understand
          why an action is unavailable.
        </p>
        <p>
          Always provide context for disabled states through tooltips or helper text.
        </p>
      </div>
    </Section>

    <Section title="Loading state accessibility">
      <div className="space-y-4 text-foreground-secondary">
        <p>
          When a button enters a loading state, announce the change to screen readers
          using <code>aria-live="polite"</code>.
        </p>
        <p>
          Prevent double-submission by disabling the button during loading, but
          maintain keyboard focus.
        </p>
        <p>
          Provide visual and programmatic indication that the action is in progress.
        </p>
      </div>
    </Section>
  </div>
);

const ButtonCode = () => (
  <div className="space-y-12">
    <Section title="HTML">
      <CodeBlock
        language="html"
        title="button.html"
        code={`<!-- Primary button -->
<button type="button" class="btn btn-primary">
  Save Changes
</button>

<!-- Secondary button -->
<button type="button" class="btn btn-secondary">
  Cancel
</button>

<!-- Tertiary button -->
<button type="button" class="btn btn-tertiary">
  Learn More
</button>

<!-- Danger button -->
<button type="button" class="btn btn-danger">
  Delete Account
</button>

<!-- With left icon -->
<button type="button" class="btn btn-primary">
  <svg class="icon">...</svg>
  Download
</button>

<!-- With right icon -->
<button type="button" class="btn btn-primary">
  Continue
  <svg class="icon">...</svg>
</button>

<!-- Disabled button -->
<button type="button" class="btn btn-primary" disabled>
  Unavailable
</button>

<!-- Loading button -->
<button type="button" class="btn btn-primary" aria-busy="true">
  <span class="spinner" aria-hidden="true"></span>
  Loading...
</button>`}
      />
    </Section>

    <Section title="CSS">
      <CodeBlock
        language="css"
        title="button.css"
        code={`.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn:focus-visible {
  outline: none;
  ring: 2px solid var(--ring);
  ring-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Primary */
.btn-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  box-shadow: 0 0 20px -5px hsl(var(--primary) / 0.4);
}

.btn-primary:hover:not(:disabled) {
  background-color: hsl(var(--primary) / 0.9);
}

/* Secondary */
.btn-secondary {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border-glass));
}

/* Tertiary */
.btn-tertiary {
  background-color: transparent;
  color: hsl(var(--foreground-secondary));
}

.btn-tertiary:hover:not(:disabled) {
  background-color: hsl(var(--secondary));
}

/* Danger (Ghost style) */
.btn-danger {
  background-color: transparent;
  color: hsl(var(--error));
  border: 1px solid transparent;
}

.btn-danger:hover:not(:disabled) {
  background-color: hsl(var(--error) / 0.1);
  border-color: hsl(var(--error) / 0.2);
}`}
      />
    </Section>

    <Section title="React">
      <CodeBlock
        language="tsx"
        title="Button.tsx"
        code={`import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground border border-border-glass hover:bg-secondary/80",
        tertiary: "bg-transparent text-foreground-secondary hover:bg-secondary hover:text-foreground",
        danger: "bg-transparent text-error hover:bg-error/10 border border-transparent hover:border-error/20",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-10 px-5",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

export function Button({ 
  variant, 
  size, 
  leftIcon, 
  rightIcon, 
  loading, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={buttonVariants({ variant, size })} 
      aria-busy={loading}
      {...props}
    >
      {loading && <Spinner />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}`}
      />
    </Section>

    <Section title="Usage examples">
      <CodeBlock
        language="tsx"
        title="Examples.tsx"
        code={`// Text only
<Button>Save Changes</Button>

// Left icon + text
<Button leftIcon={<PlusIcon />}>Add Item</Button>

// Text + right icon
<Button rightIcon={<ChevronRightIcon />}>Continue</Button>

// Danger button
<Button variant="danger" leftIcon={<TrashIcon />}>
  Delete Account
</Button>

// Loading state
<Button loading>Saving...</Button>

// Disabled state
<Button disabled>Unavailable</Button>`}
      />
    </Section>
  </div>
);

const ButtonSpecifications = () => (
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
              <td className="px-4 py-3 font-mono text-foreground">variant</td>
              <td className="px-4 py-3 font-mono text-accent">"primary"</td>
              <td className="px-4 py-3 text-foreground-secondary">Visual style of the button</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">size</td>
              <td className="px-4 py-3 font-mono text-accent">"md"</td>
              <td className="px-4 py-3 text-foreground-secondary">Height and padding preset</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">type</td>
              <td className="px-4 py-3 font-mono text-accent">"button"</td>
              <td className="px-4 py-3 text-foreground-secondary">HTML button type attribute</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">disabled</td>
              <td className="px-4 py-3 font-mono text-accent">false</td>
              <td className="px-4 py-3 text-foreground-secondary">Disables interaction</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">loading</td>
              <td className="px-4 py-3 font-mono text-accent">false</td>
              <td className="px-4 py-3 text-foreground-secondary">Shows loading spinner</td>
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
              <td className="px-4 py-3 font-mono text-foreground">Container</td>
              <td className="px-4 py-3 text-foreground-secondary">&lt;button&gt; element</td>
              <td className="px-4 py-3 text-success">Yes</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Label</td>
              <td className="px-4 py-3 text-foreground-secondary">Text content</td>
              <td className="px-4 py-3 text-success">Yes</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Left icon</td>
              <td className="px-4 py-3 text-foreground-secondary">SVG icon</td>
              <td className="px-4 py-3 text-foreground-muted">Optional</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">Right icon</td>
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
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Size</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Height</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Padding X</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Font size</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Icon size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">sm</td>
              <td className="px-4 py-3 text-foreground-secondary">36px (h-9)</td>
              <td className="px-4 py-3 text-foreground-secondary">16px (px-4)</td>
              <td className="px-4 py-3 text-foreground-secondary">12px</td>
              <td className="px-4 py-3 text-foreground-secondary">14px</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">md</td>
              <td className="px-4 py-3 text-foreground-secondary">40px (h-10)</td>
              <td className="px-4 py-3 text-foreground-secondary">20px (px-5)</td>
              <td className="px-4 py-3 text-foreground-secondary">14px</td>
              <td className="px-4 py-3 text-foreground-secondary">16px</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">lg</td>
              <td className="px-4 py-3 text-foreground-secondary">48px (h-12)</td>
              <td className="px-4 py-3 text-foreground-secondary">32px (px-8)</td>
              <td className="px-4 py-3 text-foreground-secondary">16px</td>
              <td className="px-4 py-3 text-foreground-secondary">20px</td>
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
            <span><strong className="text-foreground">Focus ring:</strong> Always visible on keyboard focus, 2px width with offset</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
            <span><strong className="text-foreground">Disabled state:</strong> 50% opacity, pointer-events disabled</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
            <span><strong className="text-foreground">Loading state:</strong> Shows spinner, label changes to loading text</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
            <span><strong className="text-foreground">Border radius:</strong> Always uses --radius-lg (8px), not customizable per button</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
            <span><strong className="text-foreground">Icon gap:</strong> Fixed 8px gap between icon and label</span>
          </li>
        </ul>
      </div>
    </Section>

    <Section title="Non-customizable rules">
      <div className="p-4 bg-warning-muted border border-warning-border rounded-lg">
        <ul className="space-y-2 text-sm text-foreground-secondary">
          <li>• Button height cannot be changed outside predefined sizes</li>
          <li>• Icon-only buttons must use the icon size variant</li>
          <li>• Danger variant uses ghost style (no filled background)</li>
          <li>• Loading state always replaces left icon with spinner</li>
          <li>• Focus ring color matches button variant</li>
        </ul>
      </div>
    </Section>
  </div>
);

const ButtonTokens = () => (
  <div className="space-y-12">
    <Section title="Text tokens">
      <TokenTableWithPreview tokens={[
        { token: '--primary-foreground', state: 'default, hover, focus, active', usage: 'Label text on primary buttons' },
        { token: '--foreground', state: 'default, hover, focus, active', usage: 'Label text on secondary/tertiary buttons' },
        { token: '--error', state: 'default, hover, focus, active', usage: 'Label text on danger buttons' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Label text when button is disabled' },
      ]} />
    </Section>

    <Section title="Surface tokens">
      <TokenTableWithPreview tokens={[
        { token: '--primary', state: 'default', usage: 'Primary button background' },
        { token: '--primary-hover', state: 'hover', usage: 'Primary button hover background' },
        { token: '--secondary', state: 'default', usage: 'Secondary button background' },
        { token: '--secondary-hover', state: 'hover', usage: 'Secondary button hover background' },
        { token: 'transparent', state: 'default', usage: 'Tertiary/danger button background' },
        { token: '--muted', state: 'disabled', usage: 'Disabled button background' },
      ]} />
    </Section>

    <Section title="Stroke tokens">
      <TokenTableWithPreview tokens={[
        { token: '--border', state: 'default', usage: 'Secondary/tertiary button border' },
        { token: '--border-strong', state: 'hover', usage: 'Secondary/tertiary button hover border' },
        { token: '--error', state: 'default, hover', usage: 'Danger button border' },
        { token: '--ring', state: 'focus', usage: 'Focus ring for all button variants' },
      ]} />
    </Section>

    <Section title="Graphic tokens">
      <TokenTableWithPreview tokens={[
        { token: '--primary-foreground', state: 'default', usage: 'Icon color on primary buttons' },
        { token: '--foreground', state: 'default', usage: 'Icon color on secondary/tertiary buttons' },
        { token: '--error', state: 'default', usage: 'Icon color on danger buttons' },
        { token: '--foreground-disabled', state: 'disabled', usage: 'Icon color when disabled' },
      ]} />
    </Section>

    <Section title="Contrast compliance">
      <div className="p-4 bg-background-surface rounded-xl border border-border-glass">
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground-secondary">
          <li>Primary button text meets WCAG AA 4.5:1 contrast ratio against primary background</li>
          <li>Focus ring color provides minimum 3:1 contrast against adjacent colors</li>
          <li>Disabled state uses reduced opacity to indicate non-interactive state while maintaining readability</li>
          <li>Danger button text maintains AA contrast in all states</li>
        </ul>
      </div>
    </Section>
  </div>
);

const ButtonPage = () => {
  const tabs = [
    { id: "overview", label: "Overview", content: <ButtonOverview /> },
    { id: "usage", label: "Usage", content: <ButtonUsage /> },
    { id: "specifications", label: "Specifications", content: <ButtonSpecifications /> },
    { id: "tokens", label: "Tokens", content: <ButtonTokens /> },
    { id: "accessibility", label: "Accessibility", content: <ButtonAccessibility /> },
    { id: "code", label: "Code", content: <ButtonCode /> },
  ];

  return (
    <DocLayout>
      <PageHeader
        title="Button"
        description="Buttons trigger actions or navigate users through an interface."
      />
      <DocTabs tabs={tabs} />
    </DocLayout>
  );
};

export default ButtonPage;
