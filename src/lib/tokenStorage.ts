// Token storage utilities for localStorage persistence

export interface SavedToken {
  id: string;
  name: string;
  property: string;
  value?: string;
  valueType?: "color" | "dimension" | "other";
  format?: string;
  createdAt: number;
}

const STORAGE_KEY = "design-system-tokens";

export const getStoredTokens = (): SavedToken[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveToken = (token: Omit<SavedToken, "id" | "createdAt">): SavedToken => {
  const tokens = getStoredTokens();
  const newToken: SavedToken = {
    ...token,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  tokens.push(newToken);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  return newToken;
};

export const deleteTokens = (ids: string[]): void => {
  const tokens = getStoredTokens();
  const filtered = tokens.filter((t) => !ids.includes(t.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearAllTokens = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Export formats
export const exportGenericFormat = (tokens: SavedToken[]): string => {
  const output: Record<string, { value: string; type: string }> = {};
  tokens.forEach((token) => {
    output[token.name] = {
      value: token.value || "",
      type: token.valueType || "other",
    };
  });
  return JSON.stringify(output, null, 2);
};

export const exportFigmaFormat = (tokens: SavedToken[]): string => {
  const output: Record<string, { type: string; value?: string }> = {};
  tokens.forEach((token) => {
    // Convert kebab-case to slash notation for Figma
    const figmaPath = token.name.replace(/-/g, "/");
    output[figmaPath] = {
      type: token.valueType === "color" ? "COLOR" : token.valueType?.toUpperCase() || "OTHER",
      ...(token.value && { value: token.value }),
    };
  });
  return JSON.stringify(output, null, 2);
};
