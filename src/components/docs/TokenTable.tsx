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
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="bg-surface-elevated border-b border-border">
            {showSwatch && (
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted w-14 sm:w-16">
                Preview
              </th>
            )}
            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Token
            </th>
            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Value
            </th>
            {tokens.some((t) => t.description) && (
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
                Usage
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {tokens.map((token) => (
            <tr key={token.name} className="hover:bg-surface-elevated transition-colors">
              {showSwatch && (
                <td className="px-3 sm:px-4 py-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded border border-border shrink-0"
                    style={{ backgroundColor: token.value }}
                  />
                </td>
              )}
              <td className="px-3 sm:px-4 py-3 font-mono text-foreground text-xs sm:text-sm whitespace-nowrap">{token.name}</td>
              <td className="px-3 sm:px-4 py-3 font-mono text-xs sm:text-sm">
                <span className="text-foreground-secondary whitespace-nowrap">{token.value}</span>
                {hasPrimitiveTokens && token.primitiveToken && (
                  <span className="text-foreground-muted text-[0.85em] ml-1 sm:ml-2 whitespace-nowrap">
                    ({token.primitiveToken})
                  </span>
                )}
              </td>
              {tokens.some((t) => t.description) && (
                <td className="px-3 sm:px-4 py-3 text-foreground-secondary text-xs sm:text-sm">{token.description}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
