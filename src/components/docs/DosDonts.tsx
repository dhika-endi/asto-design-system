import { Check, X } from "lucide-react";
import { ReactNode } from "react";

interface DosDontsProps {
  dos: string[];
  donts: string[];
}

export const DosDonts = ({ dos, donts }: DosDontsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-success font-medium">
          <Check className="w-4 h-4" />
          <span>Do</span>
        </div>
        <ul className="space-y-2">
          {dos.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-foreground-secondary"
            >
              <span className="text-success mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-error font-medium">
          <X className="w-4 h-4" />
          <span>Don't</span>
        </div>
        <ul className="space-y-2">
          {donts.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-foreground-secondary"
            >
              <span className="text-error mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ExampleBlockProps {
  type: "do" | "dont";
  children: ReactNode;
  caption?: string;
}

export const ExampleBlock = ({ type, children, caption }: ExampleBlockProps) => {
  const isDo = type === "do";
  return (
    <div className="space-y-2">
      <div
        className={`p-6 rounded-lg border-2 ${
          isDo
            ? "border-success/30 bg-success/5"
            : "border-error/30 bg-error/5"
        }`}
      >
        {children}
      </div>
      <div className="flex items-center gap-2">
        {isDo ? (
          <Check className="w-4 h-4 text-success" />
        ) : (
          <X className="w-4 h-4 text-error" />
        )}
        {caption && (
          <span className="text-sm text-foreground-secondary">{caption}</span>
        )}
      </div>
    </div>
  );
};
