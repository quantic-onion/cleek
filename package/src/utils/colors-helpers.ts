export function hexToRgb(hex: string) {
  // Remove the hash symbol (#) if it exists
  hex = hex.replace(/^#/, '');
  // Parse the hex value into individual red, green, and blue components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Return the RGB values as an object
  return { r, g, b };
}

export function setRootColors(colors) {
  const r = document.querySelector(':root') as any;
  for (const key in colors) {
    const colorHex = colors[key];
    const rgbColor = hexToRgb(colors[key]);
    r.style.setProperty(`--${key}`, colorHex);
    r.style.setProperty(`--${key}-rgb`, `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`);
  }
}
