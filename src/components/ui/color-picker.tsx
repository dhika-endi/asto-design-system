import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import chroma from "chroma-js";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker = ({ value, onChange, className }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hue, setHue] = React.useState(0);
  const [saturation, setSaturation] = React.useState(100);
  const [brightness, setBrightness] = React.useState(50);
  const [inputMode, setInputMode] = React.useState<"hex" | "rgb">("hex");
  const [hexInput, setHexInput] = React.useState(value);
  const [rgbInput, setRgbInput] = React.useState({ r: 0, g: 0, b: 0 });
  const satBrightRef = React.useRef<HTMLDivElement>(null);
  const hueRef = React.useRef<HTMLDivElement>(null);
  const [isDraggingSatBright, setIsDraggingSatBright] = React.useState(false);
  const [isDraggingHue, setIsDraggingHue] = React.useState(false);

  // Parse the incoming color value to HSL and RGB
  React.useEffect(() => {
    try {
      const color = chroma(value);
      const [h, s, l] = color.hsl();
      const [r, g, b] = color.rgb();
      setHue(isNaN(h) ? 0 : h);
      setSaturation(s * 100);
      setBrightness(l * 100);
      setHexInput(value);
      setRgbInput({ r, g, b });
    } catch {
      // Invalid color, keep current values
    }
  }, [value]);

  // Update color when HSL changes
  const updateColor = React.useCallback((h: number, s: number, b: number) => {
    try {
      const newColor = chroma.hsl(h, s / 100, b / 100).hex();
      onChange(newColor);
    } catch {
      // Invalid color
    }
  }, [onChange]);

  // Handle saturation/brightness picker interaction
  const handleSatBrightMove = React.useCallback((clientX: number, clientY: number) => {
    if (!satBrightRef.current) return;

    const rect = satBrightRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    // x = saturation (0-100), y = brightness inverted (100-0)
    const newSat = x * 100;
    const newBright = (1 - y) * 100;

    setSaturation(newSat);
    setBrightness(newBright);
    updateColor(hue, newSat, newBright);
  }, [hue, updateColor]);

  // Handle hue slider interaction
  const handleHueMove = React.useCallback((clientX: number) => {
    if (!hueRef.current) return;

    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newHue = x * 360;

    setHue(newHue);
    updateColor(newHue, saturation, brightness);
  }, [saturation, brightness, updateColor]);

  // Mouse/touch event handlers for saturation/brightness
  const handleSatBrightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingSatBright(true);
    handleSatBrightMove(e.clientX, e.clientY);
  };

  // Mouse/touch event handlers for hue
  const handleHueMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingHue(true);
    handleHueMove(e.clientX);
  };

  // Global mouse move and up handlers
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSatBright) {
        handleSatBrightMove(e.clientX, e.clientY);
      }
      if (isDraggingHue) {
        handleHueMove(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSatBright(false);
      setIsDraggingHue(false);
    };

    if (isDraggingSatBright || isDraggingHue) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingSatBright, isDraggingHue, handleSatBrightMove, handleHueMove]);

  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Auto-add # if missing
    if (val && !val.startsWith("#")) {
      val = "#" + val;
    }
    setHexInput(val);

    // Validate and update
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val)) {
      onChange(val);
    }
  };

  // Handle RGB input change
  const handleRgbChange = (channel: "r" | "g" | "b", val: string) => {
    const numVal = Math.max(0, Math.min(255, parseInt(val) || 0));
    const newRgb = { ...rgbInput, [channel]: numVal };
    setRgbInput(newRgb);

    try {
      const newColor = chroma(newRgb.r, newRgb.g, newRgb.b).hex();
      onChange(newColor);
    } catch {
      // Invalid color
    }
  };

  // Calculate picker position
  const pickerX = (saturation / 100) * 100;
  const pickerY = (1 - brightness / 100) * 100;
  const hueX = (hue / 360) * 100;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-10 h-10 rounded-lg cursor-pointer border-2 border-border shadow-sm transition-all hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            className
          )}
          style={{ backgroundColor: value }}
          aria-label="Pick a color"
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-3 bg-surface-overlay border-border-subtle shadow-xl"
        align="start"
      >
        {/* Saturation/Brightness Picker */}
        <div
          ref={satBrightRef}
          className="relative w-full h-40 rounded-lg cursor-crosshair overflow-hidden mb-3"
          style={{
            background: `
              linear-gradient(to top, #000, transparent),
              linear-gradient(to right, #fff, transparent),
              hsl(${hue}, 100%, 50%)
            `,
          }}
          onMouseDown={handleSatBrightMouseDown}
        >
          {/* Picker indicator */}
          <div
            className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg pointer-events-none"
            style={{
              left: `${pickerX}%`,
              top: `${pickerY}%`,
              backgroundColor: value,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Hue Slider */}
        <div
          ref={hueRef}
          className="relative w-full h-3 rounded-full cursor-pointer mb-3"
          style={{
            background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
          }}
          onMouseDown={handleHueMouseDown}
        >
          {/* Hue indicator */}
          <div
            className="absolute w-4 h-4 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg pointer-events-none"
            style={{
              left: `${hueX}%`,
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-1 mb-3 p-1 bg-background rounded-lg">
          <button
            onClick={() => setInputMode("hex")}
            className={cn(
              "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
              inputMode === "hex"
                ? "bg-surface-elevated text-foreground shadow-sm"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            HEX
          </button>
          <button
            onClick={() => setInputMode("rgb")}
            className={cn(
              "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
              inputMode === "rgb"
                ? "bg-surface-elevated text-foreground shadow-sm"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            RGB
          </button>
        </div>

        {/* Input Fields */}
        <div className="flex items-center gap-3">
          {/* Color Preview */}
          <div
            className="w-10 h-10 rounded-lg border border-border-subtle shrink-0"
            style={{ backgroundColor: value }}
          />

          {inputMode === "hex" ? (
            /* HEX Input */
            <div className="flex-1">
              <input
                type="text"
                value={hexInput}
                onChange={handleHexChange}
                placeholder="#000000"
                className="w-full px-2 py-1.5 text-sm font-mono bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                maxLength={7}
              />
            </div>
          ) : (
            /* RGB Inputs */
            <div className="flex-1 flex gap-1">
              <div className="flex-1">
                <label className="text-[10px] text-foreground-muted block mb-0.5">R</label>
                <input
                  type="number"
                  value={rgbInput.r}
                  onChange={(e) => handleRgbChange("r", e.target.value)}
                  min={0}
                  max={255}
                  className="w-full px-1.5 py-1 text-xs font-mono bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-foreground-muted block mb-0.5">G</label>
                <input
                  type="number"
                  value={rgbInput.g}
                  onChange={(e) => handleRgbChange("g", e.target.value)}
                  min={0}
                  max={255}
                  className="w-full px-1.5 py-1 text-xs font-mono bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-foreground-muted block mb-0.5">B</label>
                <input
                  type="number"
                  value={rgbInput.b}
                  onChange={(e) => handleRgbChange("b", e.target.value)}
                  min={0}
                  max={255}
                  className="w-full px-1.5 py-1 text-xs font-mono bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center"
                />
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
