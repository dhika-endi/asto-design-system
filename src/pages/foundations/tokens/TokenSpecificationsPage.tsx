import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { CodeBlock } from "@/components/docs/CodeBlock";

const TokenSpecificationsPage = () => {
  return (
    <DocLayout>
      <div className="max-w-4xl">
        <PageHeader
          title="Token Specifications"
          description="Learn about token structure, naming conventions, hierarchy, and the distinction between primitive and semantic tokens."
        />

        <Section title="Token Structure">
          <p className="text-foreground-muted mb-6">
            Each token follows a consistent 5-part structure: <code className="text-primary">component-property-element-variant-state</code>. This structure communicates purpose and usage context, and is essential for maintaining and extending the design system.
          </p>
          <p className="text-foreground-muted mb-6">
            Use the <a href="/design-system/foundations/tokens/builder" className="text-primary hover:underline">Token Builder</a> to interactively generate token names.
          </p>
        </Section>

        <Section title="Naming Conventions">
          <p className="text-foreground-muted mb-6">
            Consistent naming is critical for discoverability and maintainability. Follow these rules when defining or using tokens.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Use Kebab-Case</h4>
              <p className="text-sm text-foreground-muted mb-2">
                All token names use lowercase letters separated by hyphens.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-green-400">✓ --foreground-muted</span>
                <span className="text-red-400">✗ --foregroundMuted</span>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Be Descriptive</h4>
              <p className="text-sm text-foreground-muted mb-2">
                Names should clearly indicate purpose, not just value.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-green-400">✓ --color-error</span>
                <span className="text-red-400">✗ --color-red</span>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-2">Order by Specificity</h4>
              <p className="text-sm text-foreground-muted mb-2">
                Start broad, then narrow down to specific variants or states.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-green-400">✓ --button-primary-hover</span>
                <span className="text-red-400">✗ --hover-button-primary</span>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Token Hierarchy">
          <p className="text-foreground-muted mb-6">
            Tokens are organized in a hierarchy from raw values to contextual applications. This hierarchy enables flexibility while maintaining consistency.
          </p>
          
          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 w-px bg-border-subtle" />
            
            <div className="space-y-6">
              <div className="relative pl-12">
                <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
                  <h4 className="font-medium text-foreground mb-1">Level 1: Primitive Tokens</h4>
                  <p className="text-sm text-foreground-muted mb-2">Raw values without semantic meaning.</p>
                  <code className="text-xs text-primary">--blue-500: 220 90% 56%</code>
                </div>
              </div>
              
              <div className="relative pl-12">
                <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
                  <h4 className="font-medium text-foreground mb-1">Level 2: Semantic Tokens</h4>
                  <p className="text-sm text-foreground-muted mb-2">Purpose-driven tokens that reference primitives.</p>
                  <code className="text-xs text-primary">--color-primary: var(--blue-500)</code>
                </div>
              </div>
              
              <div className="relative pl-12">
                <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-secondary border-2 border-background" />
                <div className="p-4 rounded-lg border border-border-subtle bg-background-subtle">
                  <h4 className="font-medium text-foreground mb-1">Level 3: Component Tokens</h4>
                  <p className="text-sm text-foreground-muted mb-2">Context-specific tokens for components.</p>
                  <code className="text-xs text-primary">--button-bg: var(--color-primary)</code>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Primitive vs Semantic Tokens">
          <p className="text-foreground-muted mb-6">
            Understanding the distinction between primitive and semantic tokens is fundamental to using the token system effectively.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                Primitive Tokens
              </h4>
              <ul className="space-y-2 text-sm text-foreground-muted mb-4">
                <li>• Raw, context-free values</li>
                <li>• Named by their visual property</li>
                <li>• Form the foundation layer</li>
                <li>• Rarely used directly in components</li>
              </ul>
              <CodeBlock
                code={`/* Primitive tokens */
--gray-100: 0 0% 96%;
--gray-900: 0 0% 9%;
--blue-500: 220 90% 56%;
--spacing-4: 1rem;`}
                language="css"
              />
            </div>
            
            <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle">
              <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent" />
                Semantic Tokens
              </h4>
              <ul className="space-y-2 text-sm text-foreground-muted mb-4">
                <li>• Purpose-driven names</li>
                <li>• Reference primitive tokens</li>
                <li>• Enable theming & modes</li>
                <li>• Used directly in components</li>
              </ul>
              <CodeBlock
                code={`/* Semantic tokens */
--background: var(--gray-100);
--foreground: var(--gray-900);
--primary: var(--blue-500);
--gap-default: var(--spacing-4);`}
                language="css"
              />
            </div>
          </div>
        </Section>
      </div>
    </DocLayout>
  );
};

export default TokenSpecificationsPage;
