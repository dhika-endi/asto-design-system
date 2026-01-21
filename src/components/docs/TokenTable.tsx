interface Token {
  name: string;
  value: string;
  primitiveToken?: string;
  description?: string;
}

interface TokenTableProps {
  tokens: Token[];
  showSwatch?: boolean;
}

export const TokenTable = ({ tokens, showSwatch = false }: TokenTableProps) => {
  const hasPrimitiveTokens = tokens.some((t) => t.primitiveToken);

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-background-surface border-b border-border">
            {showSwatch && (
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted w-16">
                Preview
              </th>
            )}
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Token
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Value
            </th>
            {tokens.some((t) => t.description) && (
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
                Usage
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {tokens.map((token) => (
            <tr key={token.name} className="hover:bg-background-elevated transition-colors">
              {showSwatch && (
                <td className="px-4 py-3">
                  <div
                    className="w-10 h-10 rounded border border-border"
                    style={{ backgroundColor: token.value }}
                  />
                </td>
              )}
              <td className="px-4 py-3 font-mono text-foreground">{token.name}</td>
              <td className="px-4 py-3 font-mono">
                <span className="text-foreground-secondary">{token.value}</span>
                {hasPrimitiveTokens && token.primitiveToken && (
                  <span className="text-foreground-muted text-[0.9em] ml-2">
                    ({token.primitiveToken})
                  </span>
                )}
              </td>
              {tokens.some((t) => t.description) && (
                <td className="px-4 py-3 text-foreground-secondary">{token.description}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
