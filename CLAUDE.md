# Asto Design System

A premium dark fintech design system built with React, Tailwind CSS, and shadcn/ui.

## Project Structure

```
src/
├── components/
│   ├── docs/        # Documentation components (PageHeader, Section, TokenTable, etc.)
│   ├── layout/      # Layout components (DocLayout, Navbar)
│   └── ui/          # shadcn/ui components
├── pages/
│   ├── components/  # Component documentation pages
│   ├── foundations/ # Foundation pages (Color, Typography, Spacing, etc.)
│   └── getting-started/
└── lib/             # Utilities and helpers
```

## Color System

### Background vs Surface

The color system distinguishes between **Background** (page/section level) and **Surface** (component level) tokens.

#### Background Tokens (Page/Section Level)

Use for the foundational canvas of your interface:

| Token | Value | Usage |
|-------|-------|-------|
| `--background` / `--background-default` | #0a0a0a | Main page background, body |
| `--background-subtle` | #121212 | Hero sections, footer, alternate sections |
| `--background-muted` | #1a1a1a | Emphasized sections, code blocks |

**When to use Background tokens:**
- Page body
- Main content area backgrounds
- Section backgrounds (hero, features, footer)
- Code block backgrounds

#### Surface Tokens (Component Level)

Use for UI components that sit on top of backgrounds:

| Token | Value | Usage |
|-------|-------|-------|
| `--surface` / `--surface-default` | #121212 | Sidebar, navigation bar, base components |
| `--surface-elevated` | #1a1a1a | Cards, panels, elevated components |
| `--surface-overlay` | #262626 | Modals, dropdowns, tooltips, popovers |
| `--surface-brand` | #ea580c | Primary buttons, CTAs |
| `--surface-brand-muted` | rgba(234, 88, 12, 0.15) | Hover states, subtle brand accents |

**When to use Surface tokens:**
- Sidebar and navigation components
- Cards and panels
- Modals, dialogs, and dropdowns
- Buttons and interactive elements
- Form inputs (elevated state)

### Visual Hierarchy

```
Background (darkest) → Surface → Surface Elevated → Surface Overlay (lightest)
     #0a0a0a      →  #121212  →     #1a1a1a     →      #262626
```

### CSS Usage Examples

```css
/* Page background */
body {
  background-color: hsl(var(--background));
}

/* Section with subtle background */
.hero-section {
  background-color: hsl(var(--background-subtle));
}

/* Sidebar (component) */
.sidebar {
  background-color: hsl(var(--surface));
}

/* Card (elevated component) */
.card {
  background-color: hsl(var(--surface-elevated));
}

/* Modal (overlay component) */
.modal {
  background-color: hsl(var(--surface-overlay));
}
```

### Tailwind Classes

```html
<!-- Background tokens -->
<div class="bg-background">Page background</div>
<div class="bg-background-subtle">Subtle section</div>
<div class="bg-background-muted">Muted section</div>

<!-- Surface tokens -->
<div class="bg-surface">Component background</div>
<div class="bg-surface-elevated">Elevated component</div>
<div class="bg-surface-overlay">Overlay component</div>
```

### Component Colors

Component tokens provide a dedicated layer for UI components, referencing semantic tokens for flexibility.

#### Token Hierarchy

```
Primitive Tokens (Foundation)
       ↓ references
Semantic Tokens (Context)
       ↓ references
Component Tokens (Specific UI)
```

#### Token Naming Convention

```
--{component}-{property}-{variant}-{state}
```

Examples:
- `--button-bg-primary-default`
- `--input-border-focus`
- `--checkbox-bg-checked`

#### Component Token Categories

**Button:**
- `--button-bg-primary-default`, `--button-bg-primary-hover`, `--button-bg-primary-active`
- `--button-bg-secondary-default`, `--button-bg-secondary-hover`
- `--button-bg-ghost-default`, `--button-bg-ghost-hover`
- `--button-text-primary`, `--button-text-secondary`, `--button-text-ghost`
- `--button-border-primary`, `--button-border-secondary`

**Input:**
- `--input-bg-default`, `--input-bg-disabled`
- `--input-text`, `--input-placeholder`
- `--input-border-default`, `--input-border-hover`, `--input-border-focus`, `--input-border-error`

**Checkbox:**
- `--checkbox-bg-unchecked`, `--checkbox-bg-checked`, `--checkbox-bg-disabled`
- `--checkbox-border-unchecked`, `--checkbox-border-checked`
- `--checkbox-checkmark`

**Radio:**
- `--radio-bg-unselected`, `--radio-bg-selected`, `--radio-bg-disabled`
- `--radio-border-unselected`, `--radio-border-selected`
- `--radio-dot`

**Switch:**
- `--switch-bg-off`, `--switch-bg-on`, `--switch-bg-disabled`
- `--switch-knob`, `--switch-border`

**Select:**
- `--select-bg`, `--select-text`, `--select-placeholder`
- `--select-border-default`, `--select-border-focus`
- `--select-option-hover`, `--select-option-selected`

**Textarea:**
- `--textarea-bg`, `--textarea-bg-disabled`
- `--textarea-text`, `--textarea-placeholder`
- `--textarea-border-default`, `--textarea-border-hover`, `--textarea-border-focus`

#### Usage Guidelines

**Do:**
- Always use component tokens for component styling
- Reference semantic tokens when creating new component tokens
- Follow the naming convention consistently

**Don't:**
- Use semantic or primitive tokens directly in components
- Use hardcoded color values in component styles
- Skip intermediate token layers (primitive → component)

#### CSS Usage Example

```css
/* Always use component tokens for components */
.button-primary {
  background: hsl(var(--button-bg-primary-default));
  color: hsl(var(--button-text-primary));
  border: 1px solid hsl(var(--button-border-primary));
}

.button-primary:hover {
  background: hsl(var(--button-bg-primary-hover));
}

/* Don't use semantic tokens directly in components */
.button-primary {
  background: hsl(var(--surface-brand)); /* ❌ Wrong */
}
```

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run export-colors # Export color tokens to colors.json
```

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for component primitives
- React Router for navigation
