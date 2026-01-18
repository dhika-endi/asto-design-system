import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DosDonts } from "@/components/docs/DosDonts";

const TokenUsagePage = () => {
  return (
    <DocLayout>
      <div className="max-w-4xl">
        <PageHeader
          title="Token Usage"
          description="Learn how to correctly apply design tokens in components, handle states, and avoid common mistakes."
        />

        <Section title="Applying Tokens in Components">
          <p className="text-foreground-muted mb-6">
            Tokens should be used as CSS custom properties or through Tailwind utility classes that reference the token system.
          </p>
          
          <div className="space-y-6">
            <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-4">CSS Custom Properties</h4>
              <p className="text-sm text-foreground-muted mb-4">
                Use the <code className="text-primary">var()</code> function to apply tokens in CSS.
              </p>
              <CodeBlock
                code={`.button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: var(--radius);
  padding: var(--spacing-2) var(--spacing-4);
}`}
                language="css"
              />
            </div>
            
            <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-4">Tailwind Utility Classes</h4>
              <p className="text-sm text-foreground-muted mb-4">
                Use semantic Tailwind classes that map to design tokens.
              </p>
              <CodeBlock
                code={`<button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
  Click me
</button>`}
                language="tsx"
              />
            </div>
          </div>
        </Section>

        <Section title="Handling States">
          <p className="text-foreground-muted mb-6">
            Interactive states like hover, focus, and disabled should use state-specific tokens or state modifiers in Tailwind.
          </p>
          
          <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle mb-6">
            <h4 className="font-medium text-foreground mb-4">State Tokens Example</h4>
            <CodeBlock
              code={`/* Define state-specific tokens */
--button-bg: hsl(var(--primary));
--button-bg-hover: hsl(var(--primary) / 0.9);
--button-bg-active: hsl(var(--primary) / 0.8));
--button-bg-disabled: hsl(var(--muted));

/* Apply in CSS */
.button {
  background-color: var(--button-bg);
}
.button:hover {
  background-color: var(--button-bg-hover);
}
.button:disabled {
  background-color: var(--button-bg-disabled);
}`}
              language="css"
            />
          </div>
          
          <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle">
            <h4 className="font-medium text-foreground mb-4">Tailwind State Modifiers</h4>
            <CodeBlock
              code={`<button 
  className="
    bg-primary 
    hover:bg-primary/90 
    focus-visible:ring-2 
    focus-visible:ring-ring 
    disabled:bg-muted 
    disabled:cursor-not-allowed
  "
>
  Click me
</button>`}
              language="tsx"
            />
          </div>
        </Section>

        <Section title="Do's and Don'ts">
          <DosDonts
            dos={[
              "Use semantic tokens like bg-primary instead of raw colors",
              "Reference tokens through Tailwind classes or CSS variables",
              "Use opacity modifiers for state variations (bg-primary/90)",
              "Apply tokens consistently across similar components",
              "Use foreground tokens that pair with their background tokens"
            ]}
            donts={[
              "Hard-code hex values like #3b82f6 in components",
              "Use arbitrary values like bg-[#1a1a1a]",
              "Mix token systems (some Tailwind, some raw CSS values)",
              "Create one-off colors that don't exist in the token system",
              "Use white/black classes instead of foreground/background tokens"
            ]}
          />
        </Section>

        <Section title="Common Patterns">
          <p className="text-foreground-muted mb-6">
            Follow these established patterns for consistent token usage across the system.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Surface & Text Pairing</h4>
              <p className="text-sm text-foreground-muted mb-3">
                Always pair surface tokens with their corresponding foreground tokens.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-400 block mb-1">✓ Correct</span>
                  <code className="text-xs text-foreground-muted">bg-primary + text-primary-foreground</code>
                </div>
                <div>
                  <span className="text-red-400 block mb-1">✗ Incorrect</span>
                  <code className="text-xs text-foreground-muted">bg-primary + text-white</code>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Border Colors</h4>
              <p className="text-sm text-foreground-muted mb-3">
                Use border tokens for consistent border styling.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-400 block mb-1">✓ Correct</span>
                  <code className="text-xs text-foreground-muted">border-border or border-input</code>
                </div>
                <div>
                  <span className="text-red-400 block mb-1">✗ Incorrect</span>
                  <code className="text-xs text-foreground-muted">border-gray-700</code>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Focus States</h4>
              <p className="text-sm text-foreground-muted mb-3">
                Use the ring token for focus visibility.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-400 block mb-1">✓ Correct</span>
                  <code className="text-xs text-foreground-muted">focus-visible:ring-ring</code>
                </div>
                <div>
                  <span className="text-red-400 block mb-1">✗ Incorrect</span>
                  <code className="text-xs text-foreground-muted">focus:border-blue-500</code>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Accessibility Considerations">
          <p className="text-foreground-muted mb-6">
            Tokens play a crucial role in maintaining accessibility standards. Here's how they support contrast and focus visibility.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Contrast Ratios</h4>
              <p className="text-sm text-foreground-muted">
                Foreground/background token pairs are designed to meet WCAG 2.1 contrast requirements. Using <code className="text-primary">text-foreground</code> on <code className="text-primary">bg-background</code> guarantees sufficient contrast in both light and dark modes.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Focus Visibility</h4>
              <p className="text-sm text-foreground-muted">
                The <code className="text-primary">--ring</code> token is specifically calibrated for focus indicator visibility. Always use <code className="text-primary">focus-visible:ring-ring</code> for keyboard focus states.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Reduced Motion</h4>
              <p className="text-sm text-foreground-muted">
                Animation tokens respect user preferences. Use <code className="text-primary">motion-safe:</code> and <code className="text-primary">motion-reduce:</code> modifiers alongside animation tokens.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </DocLayout>
  );
};

export default TokenUsagePage;
