import { DocLayout } from "@/components/layout/DocLayout";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Link } from "react-router-dom";
import { ArrowRight, FileCode, Paintbrush, Terminal } from "lucide-react";

const GettingStartedSetup = () => {
  return (
    <DocLayout>
      <PageHeader
        title="Setup"
        description="Get up and running with Asto Design System. Learn how to access design tokens and integrate them into your codebase."
      />

      <Section title="Design Token Access">
        <div className="space-y-6">
          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Paintbrush className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-medium text-foreground">CSS Variables</h3>
                <p className="text-sm text-foreground-muted">Native CSS custom properties</p>
              </div>
            </div>
            <p className="text-sm text-foreground-secondary mb-4">
              All design tokens are available as CSS variables in the <code className="px-1.5 py-0.5 bg-surface-elevated rounded text-xs">index.css</code> file. These variables follow the HSL color format for maximum flexibility.
            </p>
            <CodeBlock
              code={`:root {
  --primary: 220 70% 50%;
  --primary-foreground: 0 0% 100%;
  --background: 220 15% 8%;
  --foreground: 0 0% 95%;
  /* ... more tokens */
}`}
              language="css"
            />
          </div>

          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileCode className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-medium text-foreground">JSON Export</h3>
                <p className="text-sm text-foreground-muted">For tooling and automation</p>
              </div>
            </div>
            <p className="text-sm text-foreground-secondary mb-4">
              Tokens can be exported to JSON format for use with design tools, build systems, or other automation workflows.
            </p>
            <CodeBlock
              code={`{
  "colors": {
    "primary": {
      "value": "hsl(220 70% 50%)",
      "type": "color"
    },
    "background": {
      "value": "hsl(220 15% 8%)",
      "type": "color"
    }
  }
}`}
              language="json"
            />
          </div>
        </div>
      </Section>

      <Section title="Code Integration">
        <div className="space-y-6">
          <div className="p-6 bg-surface-elevated rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-medium text-foreground">React + Tailwind CSS</h3>
                <p className="text-sm text-foreground-muted">Recommended setup</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">1. Install Dependencies</h4>
                <CodeBlock
                  code={`npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
                  language="bash"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">2. Configure Tailwind</h4>
                <p className="text-sm text-foreground-muted mb-2">
                  Extend your <code className="px-1.5 py-0.5 bg-surface-elevated rounded text-xs">tailwind.config.ts</code> with the design tokens:
                </p>
                <CodeBlock
                  code={`import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          surface: "hsl(var(--background-surface))",
          elevated: "hsl(var(--background-elevated))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          muted: "hsl(var(--foreground-muted))",
        },
      },
    },
  },
} satisfies Config;`}
                  language="typescript"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">3. Import CSS Variables</h4>
                <p className="text-sm text-foreground-muted mb-2">
                  Include the design tokens in your main CSS file:
                </p>
                <CodeBlock
                  code={`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 220 70% 50%;
    --primary-foreground: 0 0% 100%;
    /* ... import all tokens */
  }
}`}
                  language="css"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">4. Use in Components</h4>
                <CodeBlock
                  code={`function Button({ children }) {
  return (
    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
      {children}
    </button>
  );
}`}
                  language="tsx"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Next Steps">
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/design-system/getting-started/learn"
            className="group p-5 bg-surface-elevated rounded-lg border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-medium text-foreground">Learn the Basics</h3>
              <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-foreground-muted">
              Understand core concepts like design tokens, component anatomy, and accessibility.
            </p>
          </Link>
          <Link
            to="/design-system/getting-started/status"
            className="group p-5 bg-surface-elevated rounded-lg border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-medium text-foreground">Component Status</h3>
              <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-foreground-muted">
              Check the maturity level of each component before implementation.
            </p>
          </Link>
        </div>
      </Section>
    </DocLayout>
  );
};

export default GettingStartedSetup;
