import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export const CodeBlock = ({ code, language, title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-header flex items-center justify-between">
        <span>{title || language}</span>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-surface-overlay rounded transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-foreground-secondary bg-transparent p-0">{code}</code>
      </pre>
    </div>
  );
};
