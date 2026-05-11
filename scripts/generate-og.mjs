#!/usr/bin/env node
/**
 * One-off generator for static brand images.
 *
 *  Outputs:
 *   - public/og-image.png             (1200x630, Open Graph default)
 *   - public/og-image-square.png      (1200x1200, Instagram / square previews)
 *   - public/apple-touch-icon.png     (180x180)
 *   - public/icon-192.png             (192x192, PWA)
 *   - public/icon-512.png             (512x512, PWA)
 *
 *  Run:  node scripts/generate-og.mjs
 */
import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");

const PURPLE = "#9333ea";
const BG = "#0a0a0a";
const TEXT = "#ffffff";
const SUB = "#9ca3af";

function ogSvg(width, height, opts) {
    const {
        showTagline = true,
        wordmarkSize = 140,
        taglineSize = 36,
        subSize = 26,
    } = opts ?? {};

    const cx = width / 2;
    const wordmarkY = showTagline ? height / 2 - 30 : height / 2 + wordmarkSize / 3;

    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="glow" cx="85%" cy="20%" r="55%">
      <stop offset="0%" stop-color="${PURPLE}" stop-opacity="0.55" />
      <stop offset="55%" stop-color="${PURPLE}" stop-opacity="0.10" />
      <stop offset="100%" stop-color="${PURPLE}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="10%" cy="100%" r="60%">
      <stop offset="0%" stop-color="#5b21b6" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#5b21b6" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="100%" height="100%" fill="${BG}" />
  <rect width="100%" height="100%" fill="url(#glow)" />
  <rect width="100%" height="100%" fill="url(#glow2)" />

  <g font-family="Inter, 'Helvetica Neue', Arial, sans-serif" text-anchor="middle">
    <text x="${cx}" y="${wordmarkY}" font-size="${wordmarkSize}" font-weight="800" fill="${TEXT}" letter-spacing="-4">koppelbaar<tspan fill="${PURPLE}">.</tspan></text>
    ${showTagline ? `
    <text x="${cx}" y="${wordmarkY + 70}" font-size="${taglineSize}" font-weight="500" fill="${TEXT}">Websites die bedrijven vooruithelpen</text>
    <text x="${cx}" y="${wordmarkY + 70 + 50}" font-size="${subSize}" font-weight="400" fill="${SUB}">Webbureau · Hasselt, België</text>
    ` : ""}
  </g>
</svg>`;
}

function iconSvg(size) {
    // Simple square icon: dark bg with stylised "k." mark.
    const fontSize = Math.floor(size * 0.62);
    const cx = size / 2;
    const cy = size / 2 + fontSize / 3;
    const radius = Math.floor(size * 0.18);

    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" rx="${radius}" ry="${radius}" fill="${BG}" />
  <g font-family="Inter, 'Helvetica Neue', Arial, sans-serif" text-anchor="middle">
    <text x="${cx}" y="${cy}" font-size="${fontSize}" font-weight="800" fill="${TEXT}" letter-spacing="-4">k<tspan fill="${PURPLE}">.</tspan></text>
  </g>
</svg>`;
}

async function render(svg, outPath) {
    const buf = await sharp(Buffer.from(svg)).png().toBuffer();
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, buf);
    console.log(`✓ ${outPath}`);
}

await render(ogSvg(1200, 630), resolve(publicDir, "og-image.png"));
await render(
    ogSvg(1200, 1200, { wordmarkSize: 160, taglineSize: 40, subSize: 28 }),
    resolve(publicDir, "og-image-square.png")
);
await render(iconSvg(180), resolve(publicDir, "apple-touch-icon.png"));
await render(iconSvg(192), resolve(publicDir, "icon-192.png"));
await render(iconSvg(512), resolve(publicDir, "icon-512.png"));

console.log("\nDone. Re-run this script after editing scripts/generate-og.mjs.");
