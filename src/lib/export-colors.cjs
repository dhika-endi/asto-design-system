const fs = require('fs');
const path = require('path');

const cssFilePath = path.join(__dirname, '..', '..', 'src', 'index.css');
const outputFilePath = path.join(__dirname, '..', '..', 'colors.json');

function extractCSSVariables(cssContent) {
  const variables = {};

  // Extract from :root
  const rootMatch = cssContent.match(/:root\s*\{([\s\S]*?)\}/);
  if (rootMatch) {
    const rootVars = {};
    const varMatches = [...rootMatch[1].matchAll(/--([a-zA-Z0-9-]+):\s*([^;]+);/g)];
    for (const match of varMatches) {
      rootVars[match[1]] = match[2].trim();
    }
    variables.dark = rootVars;
  }

  // Extract from .light
  const lightMatch = cssContent.match(/\.light\s*\{([\s\S]*?)\}/);
  if (lightMatch) {
    const lightVars = {};
    const varMatches = [...lightMatch[1].matchAll(/--([a-zA-Z0-9-]+):\s*([^;]+);/g)];
    for (const match of varMatches) {
      lightVars[match[1]] = match[2].trim();
    }
    variables.light = lightVars;
  }

  return variables;
}

try {
  const cssContent = fs.readFileSync(cssFilePath, 'utf8');
  const colors = extractCSSVariables(cssContent);

  fs.writeFileSync(outputFilePath, JSON.stringify(colors, null, 2));
  console.log('Colors exported to colors.json');
} catch (error) {
  console.error('Error exporting colors:', error);
}