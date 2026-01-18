interface TokenRow {
  token: string;
  state: string;
  usage: string;
}

interface TokenTableWithPreviewProps {
  tokens: TokenRow[];
}

const getColorFromToken = (token: string): string | null => {
  // Map token names to CSS variable references
  const tokenMap: Record<string, string> = {
    '--primary': 'hsl(var(--primary))',
    '--primary-foreground': 'hsl(var(--primary-foreground))',
    '--primary-hover': 'hsl(var(--primary) / 0.9)',
    '--secondary': 'hsl(var(--secondary))',
    '--secondary-foreground': 'hsl(var(--secondary-foreground))',
    '--secondary-hover': 'hsl(var(--secondary) / 0.8)',
    '--foreground': 'hsl(var(--foreground))',
    '--foreground-secondary': 'hsl(var(--foreground-secondary))',
    '--foreground-muted': 'hsl(var(--foreground-muted))',
    '--foreground-disabled': 'hsl(var(--foreground-disabled))',
    '--background': 'hsl(var(--background))',
    '--background-surface': 'hsl(var(--background-surface))',
    '--background-elevated': 'hsl(var(--background-elevated))',
    '--muted': 'hsl(var(--muted))',
    '--muted-foreground': 'hsl(var(--muted-foreground))',
    '--accent': 'hsl(var(--accent))',
    '--accent-foreground': 'hsl(var(--accent-foreground))',
    '--border': 'hsl(var(--border))',
    '--border-strong': 'hsl(var(--border-strong))',
    '--border-glass': 'hsl(var(--border-glass))',
    '--border-subtle': 'hsl(var(--border-subtle))',
    '--ring': 'hsl(var(--ring))',
    '--error': 'hsl(var(--error))',
    '--error-muted': 'hsl(var(--error-muted))',
    '--error-border': 'hsl(var(--error-border))',
    '--success': 'hsl(var(--success))',
    '--success-muted': 'hsl(var(--success-muted))',
    '--success-border': 'hsl(var(--success-border))',
    '--warning': 'hsl(var(--warning))',
    '--warning-muted': 'hsl(var(--warning-muted))',
    '--warning-border': 'hsl(var(--warning-border))',
    '--info': 'hsl(var(--info))',
    '--info-muted': 'hsl(var(--info-muted))',
    '--info-border': 'hsl(var(--info-border))',
    '--input': 'hsl(var(--input))',
    '--input-background': 'hsl(var(--input-background))',
  };
  
  return tokenMap[token] || null;
};

export const TokenTableWithPreview = ({ tokens }: TokenTableWithPreviewProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border-glass">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-background-surface border-b border-border-glass">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted w-16">Preview</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Token</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">State</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {tokens.map((row, index) => {
            const color = getColorFromToken(row.token);
            return (
              <tr key={index}>
                <td className="px-4 py-3">
                  {color ? (
                    <div
                      className="w-8 h-8 rounded border border-border-glass"
                      style={{ backgroundColor: color }}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded border border-border-glass border-dashed flex items-center justify-center text-xs text-foreground-muted">
                      —
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-foreground">{row.token}</td>
                <td className="px-4 py-3 text-foreground-secondary">{row.state}</td>
                <td className="px-4 py-3 text-foreground-secondary">{row.usage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
