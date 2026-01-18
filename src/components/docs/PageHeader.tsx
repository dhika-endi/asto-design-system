interface PageHeaderProps {
  title: string;
  description?: string;
  category?: string;
}

export const PageHeader = ({ title, description, category }: PageHeaderProps) => {
  return (
    <header className="mb-10 pb-6 border-b border-border-subtle">
      {category && (
        <span className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-2 block">
          {category}
        </span>
      )}
      <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-foreground-secondary max-w-2xl">
          {description}
        </p>
      )}
    </header>
  );
};
