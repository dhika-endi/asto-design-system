import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export const Section = ({ title, description, children }: SectionProps) => {
  return (
    <section className="doc-section">
      {title && (
        <h2 className="text-xl font-semibold text-foreground doc-heading">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-foreground-secondary mb-6">{description}</p>
      )}
      {children}
    </section>
  );
};
