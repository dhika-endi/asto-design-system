import { ReactNode } from "react";

interface AnatomyItem {
  number: number;
  label: string;
  required?: boolean;
  description: string;
}

interface AnatomyBlockProps {
  items: AnatomyItem[];
  children: ReactNode;
  minHeight?: string;
}

export const AnatomyBlock = ({ items, children, minHeight = "200px" }: AnatomyBlockProps) => {
  return (
    <div className="space-y-6">
      <div className="p-8 bg-surface-elevated rounded-lg border border-border-glass flex items-center justify-center overflow-hidden" style={{ minHeight }}>
        {children}
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <p key={item.number} className="text-sm text-foreground-secondary">
            <span className="font-semibold text-foreground">{item.number}. {item.label}</span>
            {item.required !== undefined && (
              <span className="text-foreground-muted"> ({item.required ? "required" : "optional"})</span>
            )}
            <span className="text-foreground-muted">:</span>{" "}
            {item.description}
          </p>
        ))}
      </div>
    </div>
  );
};

// Anatomy marker component for placing on the visual
export const AnatomyMarker = ({ 
  number, 
  className = "" 
}: { 
  number: number; 
  className?: string;
}) => (
  <span 
    className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-xs font-semibold ${className}`}
  >
    {number}
  </span>
);
