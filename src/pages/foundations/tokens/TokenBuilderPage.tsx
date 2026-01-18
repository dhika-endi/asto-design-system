import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { Input } from "@/components/ui/input";
import { Copy, Check, Sparkles, Settings, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Category presets with colors
const categoryPresets = [
  { label: "Colors", color: "bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30" },
  { label: "Typography", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30" },
  { label: "Duration", color: "bg-violet-500/20 text-violet-400 border-violet-500/30 hover:bg-violet-500/30" },
  { label: "Shadows", color: "bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30" },
  { label: "Border", color: "bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30" },
  { label: "Size", color: "bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30" },
  { label: "Gradients", color: "bg-teal-500/20 text-teal-400 border-teal-500/30 hover:bg-teal-500/30" },
  { label: "Icon", color: "bg-sky-500/20 text-sky-400 border-sky-500/30 hover:bg-sky-500/30" },
];

// Presets for each token part
const componentPresets = ["button", "input", "card", "modal", "avatar", "badge", "tooltip", "dropdown"];
const propertyPresets = ["color", "spacing", "radius", "shadow", "size", "opacity", "duration", "font"];
const elementPresets = ["background", "border", "text", "icon", "container", "label", "placeholder", "ring"];
const variantPresets = ["primary", "secondary", "destructive", "outline", "ghost", "muted", "accent", "success"];
const statePresets = ["default", "hover", "active", "focus", "disabled", "loading", "selected", "error"];

// Settings types
type SeparatorStyle = "-" | "_" | ".";
type CaseStyle = "kebab" | "snake" | "camel" | "pascal";

const TokenBuilderPage = () => {
  // Token parts
  const [component, setComponent] = useState("button");
  const [property, setProperty] = useState("color");
  const [element, setElement] = useState("background");
  const [variant, setVariant] = useState("primary");
  const [state, setState] = useState("default");
  const [copied, setCopied] = useState(false);

  // Settings state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [separator, setSeparator] = useState<SeparatorStyle>("-");
  const [caseStyle, setCaseStyle] = useState<CaseStyle>("kebab");

  // Apply case transformation
  const applyCase = (str: string): string => {
    switch (caseStyle) {
      case "camel":
        return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      case "pascal":
        return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
      case "snake":
        return str.replace(/-/g, "_");
      default:
        return str;
    }
  };

  // Build token parts
  const tokenParts = [component, property, element, variant, state];
  
  const rawToken = tokenParts.filter(Boolean).join("-");
  const casedToken = applyCase(rawToken);
  const generatedToken = caseStyle === "kebab" || caseStyle === "camel" || caseStyle === "pascal"
    ? casedToken.replace(/-/g, caseStyle === "kebab" ? separator : "")
    : casedToken.replace(/_/g, separator);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedToken);
    setCopied(true);
    toast.success("Token copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCategoryClick = (category: string) => {
    const categoryMap: Record<string, { property: string; element: string }> = {
      "Colors": { property: "color", element: "background" },
      "Typography": { property: "font", element: "text" },
      "Duration": { property: "duration", element: "transition" },
      "Shadows": { property: "shadow", element: "container" },
      "Border": { property: "border", element: "ring" },
      "Size": { property: "size", element: "container" },
      "Gradients": { property: "gradient", element: "background" },
      "Icon": { property: "color", element: "icon" },
    };
    
    const preset = categoryMap[category];
    if (preset) {
      setProperty(preset.property);
      setElement(preset.element);
      toast.success(`Applied ${category} preset`);
    }
  };

  const PresetChips = ({ 
    presets, 
    value, 
    onChange, 
    colorClass 
  }: { 
    presets: string[]; 
    value: string; 
    onChange: (v: string) => void;
    colorClass: string;
  }) => (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {presets.map((preset) => (
        <button
          key={preset}
          onClick={() => onChange(preset)}
          className={`px-2 py-0.5 text-xs font-mono rounded-md border transition-all ${
            value === preset 
              ? colorClass + " ring-1 ring-offset-1 ring-offset-background" 
              : "bg-muted/50 text-foreground-muted border-border-subtle hover:bg-muted"
          }`}
        >
          {preset}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="Token Generator"
            description="Build consistent token names using our structured naming convention. Use AI tools or manual methods to create the actual token values."
          />

          {/* Settings Panel */}
          <Section title="">
          <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border-subtle bg-background-subtle hover:bg-muted/50 transition-colors mb-4">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-foreground-muted" />
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-foreground">Settings</h3>
                    <p className="text-xs text-foreground-muted">Formatting and output defaults</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-foreground-muted transition-transform ${settingsOpen ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle mb-6 space-y-6">
                {/* Naming Format */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Naming Format</h4>
                    <p className="text-xs text-foreground-muted">Affects output format only, not token structure or logic</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Separator</Label>
                      <Select value={separator} onValueChange={(v) => setSeparator(v as SeparatorStyle)}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="-">Hyphen (-)</SelectItem>
                          <SelectItem value="_">Underscore (_)</SelectItem>
                          <SelectItem value=".">Dot (.)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Case Style</Label>
                      <Select value={caseStyle} onValueChange={(v) => setCaseStyle(v as CaseStyle)}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kebab">kebab-case</SelectItem>
                          <SelectItem value="snake">snake_case</SelectItem>
                          <SelectItem value="camel">camelCase</SelectItem>
                          <SelectItem value="pascal">PascalCase</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Live Preview */}
                  <div className="p-3 rounded-md bg-background border border-border-subtle">
                    <span className="text-xs text-foreground-muted">Preview: </span>
                    <code className="text-sm font-mono text-primary">{generatedToken}</code>
                  </div>
                </div>

                {/* Philosophy Note */}
                <div className="pt-4 border-t border-border-subtle">
                  <p className="text-xs text-foreground-muted italic">
                    Settings adjust formatting and defaults without changing core token rules. Changes apply prospectively unless explicitly regenerated.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Section>

        <Section title="">
          <div className="relative py-8 mb-6 overflow-hidden rounded-xl border border-border-subtle bg-gradient-to-br from-background-subtle to-background">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
            
            <div className="relative text-center mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Quick Categories
              </h3>
              <p className="text-sm text-foreground-muted">Click a category to auto-fill property & element</p>
            </div>
            
            {/* Floating badges layout */}
            <div className="relative flex flex-wrap justify-center gap-3 px-6">
              {categoryPresets.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => handleCategoryClick(cat.label)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all transform hover:scale-105 hover:-translate-y-0.5 ${cat.color}`}
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Token Name Generator">
          <p className="text-foreground-muted mb-6">
            Each token follows a 5-part structure. Fill in each field or click preset chips below to generate your token name.
          </p>
          
          <div className="p-6 rounded-lg border border-border-subtle bg-background-subtle mb-6">
            <h4 className="font-mono text-sm text-primary mb-4">Token Anatomy</h4>
            
            {/* Desktop: Grid Layout with Separators */}
            <div className="hidden sm:block">
              {/* Labels Row */}
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 text-sm mb-3 items-center">
                <span className="px-3 py-1.5 rounded bg-primary/20 text-primary font-mono text-center text-xs">component</span>
                <span className="text-foreground-muted font-mono">-</span>
                <span className="px-3 py-1.5 rounded bg-accent/20 text-accent font-mono text-center text-xs">property</span>
                <span className="text-foreground-muted font-mono">-</span>
                <span className="px-3 py-1.5 rounded bg-warning/20 text-warning font-mono text-center text-xs">element</span>
                <span className="text-foreground-muted font-mono">-</span>
                <span className="px-3 py-1.5 rounded bg-slate-500/20 text-slate-300 font-mono text-center text-xs">variant</span>
                <span className="text-foreground-muted font-mono">-</span>
                <span className="px-3 py-1.5 rounded bg-muted text-foreground font-mono text-center text-xs">state</span>
              </div>

              {/* Input Fields Row */}
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 mb-6 items-center">
                <Input
                  value={component}
                  onChange={(e) => setComponent(e.target.value)}
                  placeholder="button"
                  className="h-9 text-xs font-mono bg-background border-primary/30 focus:border-primary text-center"
                />
                <span className="text-foreground-muted font-mono">-</span>
                <Input
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  placeholder="color"
                  className="h-9 text-xs font-mono bg-background border-accent/30 focus:border-accent text-center"
                />
                <span className="text-foreground-muted font-mono">-</span>
                <Input
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                  placeholder="background"
                  className="h-9 text-xs font-mono bg-background border-warning/30 focus:border-warning text-center"
                />
                <span className="text-foreground-muted font-mono">-</span>
                <Input
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  placeholder="primary"
                  className="h-9 text-xs font-mono bg-background border-slate-500/30 focus:border-slate-400 text-center"
                />
                <span className="text-foreground-muted font-mono">-</span>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="default"
                  className="h-9 text-xs font-mono bg-background border-muted focus:border-foreground text-center"
                />
              </div>
            </div>

            {/* Mobile: Stacked Layout */}
            <div className="sm:hidden space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 px-2 py-1.5 rounded bg-primary/20 text-primary font-mono text-xs text-center">component</span>
                <Input
                  value={component}
                  onChange={(e) => setComponent(e.target.value)}
                  placeholder="button"
                  className="flex-1 h-9 text-xs font-mono bg-background border-primary/30 focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 px-2 py-1.5 rounded bg-accent/20 text-accent font-mono text-xs text-center">property</span>
                <Input
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  placeholder="color"
                  className="flex-1 h-9 text-xs font-mono bg-background border-accent/30 focus:border-accent"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 px-2 py-1.5 rounded bg-warning/20 text-warning font-mono text-xs text-center">element</span>
                <Input
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                  placeholder="background"
                  className="flex-1 h-9 text-xs font-mono bg-background border-warning/30 focus:border-warning"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 px-2 py-1.5 rounded bg-slate-500/20 text-slate-300 font-mono text-xs text-center">variant</span>
                <Input
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  placeholder="primary"
                  className="flex-1 h-9 text-xs font-mono bg-background border-slate-500/30 focus:border-slate-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 px-2 py-1.5 rounded bg-muted text-foreground font-mono text-xs text-center">state</span>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="default"
                  className="flex-1 h-9 text-xs font-mono bg-background border-muted focus:border-foreground"
                />
              </div>
            </div>

            {/* Live Preview with Copy Button */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border-subtle">
              <code className="flex-1 text-base font-mono text-primary font-medium">{generatedToken}</code>
              <button
                onClick={handleCopy}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                title="Copy token"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-foreground-muted" />
                )}
              </button>
            </div>
            <p className="text-xs text-foreground-muted mt-3">
              Copy this token name and use it in your design tools (Figma) or code. Use AI assistants like Claude or ChatGPT to generate token values following our design system foundations.
            </p>
          </div>
        </Section>

        <Section title="Preset Options">
          <p className="text-foreground-muted mb-6">
            Click any preset to quickly fill in a token part. Active selections are highlighted.
          </p>

          <div className="space-y-6">
            {/* Component Presets */}
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <h4 className="font-mono text-sm text-primary mb-1">component</h4>
              <p className="text-xs text-foreground-muted mb-2">The UI component this token applies to</p>
              <PresetChips 
                presets={componentPresets} 
                value={component} 
                onChange={setComponent}
                colorClass="bg-primary/20 text-primary border-primary/30"
              />
            </div>

            {/* Property Presets */}
            <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
              <h4 className="font-mono text-sm text-accent mb-1">property</h4>
              <p className="text-xs text-foreground-muted mb-2">The CSS property type</p>
              <PresetChips 
                presets={propertyPresets} 
                value={property} 
                onChange={setProperty}
                colorClass="bg-accent/20 text-accent border-accent/30"
              />
            </div>

            {/* Element Presets */}
            <div className="p-4 rounded-lg border border-warning/20 bg-warning/5">
              <h4 className="font-mono text-sm text-warning mb-1">element</h4>
              <p className="text-xs text-foreground-muted mb-2">The specific element within the component</p>
              <PresetChips 
                presets={elementPresets} 
                value={element} 
                onChange={setElement}
                colorClass="bg-warning/20 text-warning border-warning/30"
              />
            </div>

            {/* Variant Presets */}
            <div className="p-4 rounded-lg border border-slate-500/20 bg-slate-500/5">
              <h4 className="font-mono text-sm text-slate-300 mb-1">variant</h4>
              <p className="text-xs text-foreground-muted mb-2">The visual variant</p>
              <PresetChips 
                presets={variantPresets} 
                value={variant} 
                onChange={setVariant}
                colorClass="bg-slate-500/20 text-slate-300 border-slate-500/30"
              />
            </div>

            {/* State Presets */}
            <div className="p-4 rounded-lg border border-border-subtle bg-muted/30">
              <h4 className="font-mono text-sm text-foreground mb-1">state</h4>
              <p className="text-xs text-foreground-muted mb-2">The interaction state</p>
              <PresetChips 
                presets={statePresets} 
                value={state} 
                onChange={setState}
                colorClass="bg-foreground/10 text-foreground border-foreground/20"
              />
            </div>
          </div>
        </Section>
        </div>
      </main>
    </div>
  );
};

export default TokenBuilderPage;
