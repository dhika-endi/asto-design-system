import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PageHeader } from "@/components/docs/PageHeader";
import { Section } from "@/components/docs/Section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sparkles,
  Copy,
  Check,
  Plus,
  X,
  Palette,
  Sliders,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import chroma from "chroma-js";

// Types
interface ColorShade {
  shade: number | string;
  hex: string;
  isCustom?: boolean;
}

interface ColorScale {
  name: string;
  shades: ColorShade[];
}

interface GeneratedPalette {
  brand: ColorScale;
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
}

type ScaleName = "brand" | "neutral" | "success" | "warning" | "error" | "info";

interface ScaleColors {
  brand: string;
  neutral: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

// Default colors for each scale
const defaultScaleColors: ScaleColors = {
  brand: "#EA580C",
  neutral: "#6B7280",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
};

// Generate a color scale from any base color
const generateColorScale = (baseColor: string, scaleName: ScaleName): ColorShade[] => {
  const color = chroma(baseColor);
  const hue = color.get("hsl.h");
  const saturation = color.get("hsl.s");

  // Neutral scale has much lower saturation
  const isNeutral = scaleName === "neutral";
  const baseSaturation = isNeutral ? 0.03 : Math.min(saturation, 0.85);

  // Same shade range for all scales (100-900)
  const shadeData = [
    { shade: 100, lightness: 0.95 },
    { shade: 200, lightness: 0.85 },
    { shade: 300, lightness: 0.75 },
    { shade: 400, lightness: 0.65 },
    { shade: 500, lightness: 0.5 },
    { shade: 600, lightness: 0.4 },
    { shade: 700, lightness: 0.3 },
    { shade: 800, lightness: 0.2 },
    { shade: 900, lightness: 0.1 },
  ];

  return shadeData.map(({ shade, lightness }) => ({
    shade,
    hex: chroma.hsl(hue, baseSaturation, lightness).hex(),
  }));
};

// Generate full palette from scale colors
const generatePaletteFromColors = (colors: ScaleColors): GeneratedPalette => {
  return {
    brand: {
      name: "Brand",
      shades: generateColorScale(colors.brand, "brand"),
    },
    neutral: {
      name: "Neutral",
      shades: generateColorScale(colors.neutral, "neutral"),
    },
    success: {
      name: "Success",
      shades: generateColorScale(colors.success, "success"),
    },
    warning: {
      name: "Warning",
      shades: generateColorScale(colors.warning, "warning"),
    },
    error: {
      name: "Error",
      shades: generateColorScale(colors.error, "error"),
    },
    info: {
      name: "Info",
      shades: generateColorScale(colors.info, "info"),
    },
  };
};

// Export functions
const exportAsCSS = (
  palette: GeneratedPalette,
  customShades: Record<string, ColorShade[]>
): string => {
  let css = ":root {\n";

  const scales = ["brand", "neutral", "success", "warning", "error", "info"] as const;

  scales.forEach((scaleName) => {
    const scale = palette[scaleName];
    const custom = customShades[scaleName] || [];
    const allShades = [...scale.shades, ...custom].sort((a, b) => {
      const aNum =
        typeof a.shade === "number" ? a.shade : parseInt(a.shade as string);
      const bNum =
        typeof b.shade === "number" ? b.shade : parseInt(b.shade as string);
      return aNum - bNum;
    });

    css += `  /* ${scale.name} */\n`;
    allShades.forEach((shade) => {
      css += `  --${scaleName}-${shade.shade}: ${shade.hex};\n`;
    });
    css += "\n";
  });

  css += "}";
  return css;
};

const exportAsJSON = (
  palette: GeneratedPalette,
  customShades: Record<string, ColorShade[]>
): string => {
  const result: Record<string, Record<string, string>> = {};

  const scales = ["brand", "neutral", "success", "warning", "error", "info"] as const;

  scales.forEach((scaleName) => {
    const scale = palette[scaleName];
    const custom = customShades[scaleName] || [];
    const allShades = [...scale.shades, ...custom].sort((a, b) => {
      const aNum =
        typeof a.shade === "number" ? a.shade : parseInt(a.shade as string);
      const bNum =
        typeof b.shade === "number" ? b.shade : parseInt(b.shade as string);
      return aNum - bNum;
    });

    result[scaleName] = {};
    allShades.forEach((shade) => {
      const key = shade.isCustom ? `custom-${shade.shade}` : String(shade.shade);
      result[scaleName][key] = shade.hex;
    });
  });

  return JSON.stringify(result, null, 2);
};

// Figma token value interface (DTCG format)
interface FigmaColorValue {
  $type: "color";
  $value: {
    colorSpace: "srgb";
    components: [number, number, number];
    alpha: number;
    hex: string;
  };
}

const exportAsFigmaTokens = (
  palette: GeneratedPalette,
  customShades: Record<string, ColorShade[]>
): string => {
  const result: Record<string, Record<string, Record<string, FigmaColorValue>>> = {
    color: {},
  };

  const scales = ["brand", "neutral", "success", "warning", "error", "info"] as const;

  scales.forEach((scaleName) => {
    const scale = palette[scaleName];
    const custom = customShades[scaleName] || [];
    const allShades = [...scale.shades, ...custom].sort((a, b) => {
      const aNum =
        typeof a.shade === "number" ? a.shade : parseInt(a.shade as string);
      const bNum =
        typeof b.shade === "number" ? b.shade : parseInt(b.shade as string);
      return aNum - bNum;
    });

    result.color[scaleName] = {};
    allShades.forEach((shade) => {
      const key = shade.isCustom ? `custom-${shade.shade}` : String(shade.shade);

      // Convert hex to RGB components (0-1 range) using chroma-js
      const color = chroma(shade.hex);
      const [r, g, b] = color.rgb();

      // Round to 3 decimal places for cleaner output
      const components: [number, number, number] = [
        Math.round((r / 255) * 1000) / 1000,
        Math.round((g / 255) * 1000) / 1000,
        Math.round((b / 255) * 1000) / 1000,
      ];

      result.color[scaleName][key] = {
        $type: "color",
        $value: {
          colorSpace: "srgb",
          components,
          alpha: 1,
          hex: shade.hex.toUpperCase(),
        },
      };
    });
  });

  return JSON.stringify(result, null, 2);
};

// Scale display names and colors
const scaleConfig = {
  brand: { name: "Brand", baseShade: 500 },
  neutral: { name: "Neutral", baseShade: 500 },
  success: { name: "Success", baseShade: 500 },
  info: { name: "Info", baseShade: 500 },
  warning: { name: "Warning", baseShade: 500 },
  error: { name: "Danger", baseShade: 500 },
};

// Color Scale Card Component - With editable base color
const ColorScaleCard = ({
  scale,
  scaleName,
  baseColor,
  customShades,
  onColorChange,
  onAddCustom,
  onRemoveCustom,
}: {
  scale: ColorScale;
  scaleName: string;
  baseColor: string;
  customShades: ColorShade[];
  onColorChange: (scaleName: string, color: string) => void;
  onAddCustom: (scale: string, afterShade: number | string) => void;
  onRemoveCustom: (scale: string, shade: number | string) => void;
}) => {
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState(baseColor);
  const config = scaleConfig[scaleName as keyof typeof scaleConfig];

  // Merge and sort all shades
  const allShades = [...scale.shades, ...customShades].sort((a, b) => {
    const aNum = typeof a.shade === "number" ? a.shade : parseInt(a.shade as string);
    const bNum = typeof b.shade === "number" ? b.shade : parseInt(b.shade as string);
    return aNum - bNum;
  });

  // Validate hex color
  const isValidHex = (hex: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  };

  const handleCopyBase = () => {
    navigator.clipboard.writeText(baseColor.toUpperCase());
    setCopied(true);
    toast.success(`Copied ${baseColor.toUpperCase()}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyShade = (hex: string) => {
    navigator.clipboard.writeText(hex.toUpperCase());
    toast.success(`Copied ${hex.toUpperCase()}`);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (isValidHex(value)) {
      onColorChange(scaleName, value);
    }
  };

  const handleColorPickerChange = (value: string) => {
    setInputValue(value);
    onColorChange(scaleName, value);
  };

  return (
    <div className="flex-1 min-w-[200px]">
      {/* Header with name */}
      <div className="mb-3">
        <span className="text-sm font-medium text-foreground-muted">
          {config.name}
        </span>
      </div>

      {/* Main color input card */}
      <div className="rounded-xl border border-border bg-surface p-3 mb-4">
        <div className="flex items-center gap-2">
          {/* Modern color picker */}
          <ColorPicker
            value={baseColor}
            onChange={(color) => handleColorPickerChange(color)}
          />

          {/* Hex value input */}
          <div className="flex-1 min-w-0">
            <Input
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="h-10 font-mono text-xs px-2"
              placeholder="#000000"
            />
          </div>

          {/* Copy button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopyBase}
                className="p-2 rounded-lg border border-border hover:bg-muted transition-colors shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-foreground-muted" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Copy base color</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Shade scale */}
      <div className="space-y-0">
        {allShades.map((shade, index) => (
          <div key={`${shade.shade}-${shade.isCustom ? "custom" : "default"}`} className="group relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCopyShade(shade.hex)}
                  className="w-full flex items-center gap-3 hover:bg-muted/50 transition-colors rounded-sm py-0.5 px-1 -mx-1"
                >
                  {/* Shade number */}
                  <span className="w-8 text-xs text-foreground-muted font-medium text-right shrink-0">
                    {shade.shade}
                  </span>

                  {/* Color bar */}
                  <div
                    className="flex-1 h-8 rounded-md transition-all group-hover:scale-[1.02] group-hover:shadow-md"
                    style={{ backgroundColor: shade.hex }}
                  />

                  {/* Custom badge */}
                  {shade.isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveCustom(scaleName, shade.shade);
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-xs font-mono">{shade.hex.toUpperCase()}</p>
              </TooltipContent>
            </Tooltip>

            {/* Add custom shade button (between shades) */}
            {index < allShades.length - 1 && (
              <button
                onClick={() => onAddCustom(scaleName, shade.shade)}
                className="absolute left-11 -bottom-2 w-5 h-5 rounded-full bg-surface border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary hover:border-primary hover:text-white transition-all z-10 shadow-sm"
                title="Add custom shade"
              >
                <Plus className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const ColorGeneratorPage = () => {
  const [scaleColors, setScaleColors] = useState<ScaleColors>(defaultScaleColors);
  const [palette, setPalette] = useState<GeneratedPalette>(() =>
    generatePaletteFromColors(defaultScaleColors)
  );
  const [customShades, setCustomShades] = useState<Record<string, ColorShade[]>>({});
  const [copiedExport, setCopiedExport] = useState<string | null>(null);

  // Custom shade modal state
  const [customShadeModal, setCustomShadeModal] = useState<{
    open: boolean;
    scale: string;
    afterShade: number | string;
    beforeShade: number | string;
  } | null>(null);
  const [newShadeName, setNewShadeName] = useState("");
  const [newShadeHex, setNewShadeHex] = useState("#888888");

  // Validate hex color
  const isValidHex = (hex: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  };

  // Handle scale color change
  const handleScaleColorChange = (scaleName: string, newColor: string) => {
    const newScaleColors = {
      ...scaleColors,
      [scaleName]: newColor,
    };
    setScaleColors(newScaleColors);

    // Regenerate just that scale
    setPalette((prev) => ({
      ...prev,
      [scaleName]: {
        name: scaleConfig[scaleName as keyof typeof scaleConfig].name,
        shades: generateColorScale(newColor, scaleName as ScaleName),
      },
    }));
  };

  // Open custom shade modal
  const handleOpenCustomShadeModal = (scale: string, afterShade: number | string) => {
    if (!palette) return;

    const scaleData = palette[scale as keyof GeneratedPalette];
    const custom = customShades[scale] || [];
    const allShades = [...scaleData.shades, ...custom].sort((a, b) => {
      const aNum = typeof a.shade === "number" ? a.shade : parseInt(a.shade as string);
      const bNum = typeof b.shade === "number" ? b.shade : parseInt(b.shade as string);
      return aNum - bNum;
    });

    const currentIndex = allShades.findIndex(
      (s) => String(s.shade) === String(afterShade)
    );
    const nextShade = allShades[currentIndex + 1]?.shade;

    if (!nextShade) return;

    const afterNum = typeof afterShade === "number" ? afterShade : parseInt(afterShade as string);
    const beforeNum = typeof nextShade === "number" ? nextShade : parseInt(nextShade as string);
    const suggestedName = Math.round((afterNum + beforeNum) / 2).toString();

    const afterColor = allShades[currentIndex].hex;
    const beforeColor = allShades[currentIndex + 1].hex;
    const suggestedHex = chroma.mix(afterColor, beforeColor, 0.5).hex();

    setNewShadeName(suggestedName);
    setNewShadeHex(suggestedHex);
    setCustomShadeModal({
      open: true,
      scale,
      afterShade,
      beforeShade: nextShade,
    });
  };

  // Add custom shade
  const handleAddCustomShade = () => {
    if (!customShadeModal || !palette) return;

    const { scale, afterShade, beforeShade } = customShadeModal;
    const shadeNum = parseInt(newShadeName);

    const afterNum = typeof afterShade === "number" ? afterShade : parseInt(afterShade as string);
    const beforeNum = typeof beforeShade === "number" ? beforeShade : parseInt(beforeShade as string);

    if (isNaN(shadeNum) || shadeNum <= afterNum || shadeNum >= beforeNum) {
      toast.error(`Shade number must be between ${afterNum} and ${beforeNum}`);
      return;
    }

    if (!isValidHex(newShadeHex)) {
      toast.error("Please enter a valid hex color");
      return;
    }

    const existing = customShades[scale] || [];
    if (existing.some((s) => String(s.shade) === newShadeName)) {
      toast.error("A shade with this number already exists");
      return;
    }

    setCustomShades({
      ...customShades,
      [scale]: [...existing, { shade: newShadeName, hex: newShadeHex, isCustom: true }],
    });

    setCustomShadeModal(null);
    toast.success(`Custom shade ${newShadeName} added`);
  };

  // Remove custom shade
  const handleRemoveCustomShade = (scale: string, shade: number | string) => {
    const existing = customShades[scale] || [];
    setCustomShades({
      ...customShades,
      [scale]: existing.filter((s) => s.shade !== shade),
    });
    toast.success("Custom shade removed");
  };

  // Copy export
  const handleCopyExport = (type: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedExport(type);
    toast.success(`${type} copied to clipboard`);
    setTimeout(() => setCopiedExport(null), 2000);
  };

  // Download export
  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            title="Color Generator"
            description="Create and customize comprehensive color palettes. Adjust each color category individually to generate a complete primitive color system."
          />

          {/* Feature Cards */}
          <Section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-6 rounded-xl border border-border-subtle bg-surface-elevated">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  AI-Powered Generation
                </h3>
                <p className="text-sm text-foreground-muted">
                  Smart color harmonies based on your brand color using color theory
                  algorithms.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border-subtle bg-surface-elevated">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Palette className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Complete Palette
                </h3>
                <p className="text-sm text-foreground-muted">
                  Neutral + 4 semantic color scales (success, warning, error, info)
                  with 9-11 shades each.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border-subtle bg-surface-elevated">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <Sliders className="w-5 h-5 text-violet-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Customizable Shades
                </h3>
                <p className="text-sm text-foreground-muted">
                  Add custom shades between existing levels to fine-tune your palette.
                </p>
              </div>
            </div>
          </Section>

          {/* Step 1: Color Palette */}
          <Section title="1. Your Color Palette">
            <p className="text-foreground-muted mb-6">
              Click on each color card to customize the base color. Hover over shade bars to see hex values. Click to copy.
            </p>

            {/* Palette Grid - 6 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {(["brand", "neutral", "success", "info", "warning", "error"] as const).map(
                (scaleName) => (
                  <ColorScaleCard
                    key={scaleName}
                    scale={palette[scaleName]}
                    scaleName={scaleName}
                    baseColor={scaleColors[scaleName]}
                    customShades={customShades[scaleName] || []}
                    onColorChange={handleScaleColorChange}
                    onAddCustom={handleOpenCustomShadeModal}
                    onRemoveCustom={handleRemoveCustomShade}
                  />
                )
              )}
            </div>
          </Section>

          {/* Step 2: Export */}
          <Section title="2. Export Your Palette">
              <Tabs defaultValue="figma" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="figma">Figma Tokens</TabsTrigger>
                  <TabsTrigger value="css">CSS Variables</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                </TabsList>

                <TabsContent value="figma">
                  <div className="relative">
                    <pre className="p-4 rounded-xl bg-background-muted border border-border-subtle overflow-x-auto text-sm font-mono text-foreground-muted max-h-96">
                      {exportAsFigmaTokens(palette, customShades)}
                    </pre>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          handleCopyExport(
                            "Figma",
                            exportAsFigmaTokens(palette, customShades)
                          )
                        }
                      >
                        {copiedExport === "Figma" ? (
                          <Check className="w-4 h-4 mr-1" />
                        ) : (
                          <Copy className="w-4 h-4 mr-1" />
                        )}
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          handleDownload(
                            "figma-tokens.json",
                            exportAsFigmaTokens(palette, customShades)
                          )
                        }
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="css">
                  <div className="relative">
                    <pre className="p-4 rounded-xl bg-background-muted border border-border-subtle overflow-x-auto text-sm font-mono text-foreground-muted max-h-96">
                      {exportAsCSS(palette, customShades)}
                    </pre>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          handleCopyExport("CSS", exportAsCSS(palette, customShades))
                        }
                      >
                        {copiedExport === "CSS" ? (
                          <Check className="w-4 h-4 mr-1" />
                        ) : (
                          <Copy className="w-4 h-4 mr-1" />
                        )}
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          handleDownload(
                            "tokens.css",
                            exportAsCSS(palette, customShades)
                          )
                        }
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="json">
                  <div className="relative">
                    <pre className="p-4 rounded-xl bg-background-muted border border-border-subtle overflow-x-auto text-sm font-mono text-foreground-muted max-h-96">
                      {exportAsJSON(palette, customShades)}
                    </pre>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          handleCopyExport("JSON", exportAsJSON(palette, customShades))
                        }
                      >
                        {copiedExport === "JSON" ? (
                          <Check className="w-4 h-4 mr-1" />
                        ) : (
                          <Copy className="w-4 h-4 mr-1" />
                        )}
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          handleDownload(
                            "tokens.json",
                            exportAsJSON(palette, customShades)
                          )
                        }
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Section>
        </div>
      </main>

      {/* Custom Shade Modal */}
      <Dialog
        open={customShadeModal?.open || false}
        onOpenChange={(open) => !open && setCustomShadeModal(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Shade</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Shade Number</Label>
              <Input
                type="number"
                value={newShadeName}
                onChange={(e) => setNewShadeName(e.target.value)}
                placeholder="e.g., 250"
                className="font-mono"
              />
              <p className="text-xs text-foreground-muted mt-1">
                Must be between {customShadeModal?.afterShade} and{" "}
                {customShadeModal?.beforeShade}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Color</Label>
              <div className="flex gap-3">
                <ColorPicker
                  value={newShadeHex}
                  onChange={(color) => setNewShadeHex(color)}
                />
                <Input
                  value={newShadeHex}
                  onChange={(e) => setNewShadeHex(e.target.value)}
                  placeholder="#888888"
                  className="font-mono flex-1"
                />
              </div>
            </div>

            {/* Preview */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Preview</Label>
              <div
                className="h-20 rounded-lg border border-border-subtle flex items-center justify-center"
                style={{ backgroundColor: newShadeHex }}
              >
                <span
                  className="font-mono text-sm font-medium"
                  style={{
                    color: isValidHex(newShadeHex)
                      ? chroma(newShadeHex).luminance() > 0.5
                        ? "#000"
                        : "#fff"
                      : "#fff",
                  }}
                >
                  {newShadeName} - {newShadeHex.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCustomShadeModal(null)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomShade}>Add Custom Shade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ColorGeneratorPage;
