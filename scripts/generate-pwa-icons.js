import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');

// HTML generator for exact SVG icons
function createSvgHtml(svgContent, size) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: ${size}px;
      height: ${size}px;
      overflow: hidden;
      background: transparent;
    }
    svg {
      width: ${size}px;
      height: ${size}px;
      display: block;
    }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;
}

// 1. Standard 192x192 SVG
const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <rect width="192" height="192" rx="42" fill="#1a1a1a"/>
  <rect x="9" y="9" width="174" height="174" rx="33" fill="none" stroke="#b83b1d" stroke-width="6" opacity="0.65"/>
  <text x="96" y="126" font-family="'JetBrains Mono', 'Segoe UI', -apple-system, monospace, sans-serif" font-size="84" font-weight="900" fill="#fbfbf9" text-anchor="middle" letter-spacing="-3">
    A<tspan fill="#b83b1d">J</tspan>
  </text>
  <circle cx="147" cy="123" r="9" fill="#b83b1d"/>
</svg>`;

// 2. Standard 512x512 SVG
const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#1a1a1a"/>
  <rect x="24" y="24" width="464" height="464" rx="88" fill="none" stroke="#b83b1d" stroke-width="16" opacity="0.65"/>
  <text x="256" y="336" font-family="'JetBrains Mono', 'Segoe UI', -apple-system, monospace, sans-serif" font-size="224" font-weight="900" fill="#fbfbf9" text-anchor="middle" letter-spacing="-8">
    A<tspan fill="#b83b1d">J</tspan>
  </text>
  <circle cx="392" cy="328" r="24" fill="#b83b1d"/>
</svg>`;

// 3. Maskable 512x512 SVG (with safe area padding so circular/squircle crops don't cut off)
const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Solid background extending to edges for maskable canvas -->
  <rect width="512" height="512" fill="#1a1a1a"/>
  <!-- Scaled logo centered in safe zone (80% safe zone = 410px) -->
  <g transform="translate(56, 56) scale(0.78)">
    <rect width="512" height="512" rx="112" fill="#1a1a1a"/>
    <rect x="24" y="24" width="464" height="464" rx="88" fill="none" stroke="#b83b1d" stroke-width="16" opacity="0.65"/>
    <text x="256" y="336" font-family="'JetBrains Mono', 'Segoe UI', -apple-system, monospace, sans-serif" font-size="224" font-weight="900" fill="#fbfbf9" text-anchor="middle" letter-spacing="-8">
      A<tspan fill="#b83b1d">J</tspan>
    </text>
    <circle cx="392" cy="328" r="24" fill="#b83b1d"/>
  </g>
</svg>`;

// 4. Apple Touch Icon 180x180
const svgApple = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" rx="40" fill="#1a1a1a"/>
  <rect x="8" y="8" width="164" height="164" rx="32" fill="none" stroke="#b83b1d" stroke-width="5" opacity="0.65"/>
  <text x="90" y="118" font-family="'JetBrains Mono', 'Segoe UI', -apple-system, monospace, sans-serif" font-size="78" font-weight="900" fill="#fbfbf9" text-anchor="middle" letter-spacing="-3">
    A<tspan fill="#b83b1d">J</tspan>
  </text>
  <circle cx="138" cy="115" r="8" fill="#b83b1d"/>
</svg>`;

const chromePath = 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe';

const icons = [
  { name: 'icon-192.png', size: 192, svg: svg192 },
  { name: 'icon-512.png', size: 512, svg: svg512 },
  { name: 'icon-maskable-512.png', size: 512, svg: svgMaskable },
  { name: 'apple-touch-icon.png', size: 180, svg: svgApple },
];

for (const icon of icons) {
  const tempHtmlPath = path.join(projectRoot, 'scripts', `temp-${icon.size}.html`);
  const outputPath = path.join(publicDir, icon.name);

  fs.writeFileSync(tempHtmlPath, createSvgHtml(icon.svg, icon.size), 'utf-8');

  console.log(`Generating ${icon.name} (${icon.size}x${icon.size})...`);
  execSync(
    `powershell -Command "& '${chromePath}' --headless=new --disable-gpu --force-device-scale-factor=1 --default-background-color=00000000 --window-size=${icon.size},${icon.size} --screenshot='${outputPath}' 'file:///${tempHtmlPath.replace(/\\\\/g, '/')}'"`
  );

  fs.unlinkSync(tempHtmlPath);
  console.log(`✓ Created ${outputPath}`);
}

console.log('All PWA icons generated successfully from favicon.svg design!');
