import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

// Directories to skip
const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', '.agents', '.gemini', 'scratch']);
// File extensions to scan
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.json', '.md']);

// Known Mojibake regex patterns (UTF-8 bytes misinterpreted as Windows-1252/Latin-1)
const MOJIBAKE_REGEX = /[\uFFFD]|ð[\x80-\xFF]|ðŸ|ï¸|â€[™œ –—…•˜]|Ã[\x80-\xBF]|Â[\xA0-\xFF]/g;

let totalFilesChecked = 0;
const violations = [];

function checkFile(fullPath, relPath) {
  const buffer = fs.readFileSync(fullPath);

  // 1. Check for UTF-8 BOM (0xEF, 0xBB, 0xBF)
  if (buffer.length >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    violations.push({
      file: relPath,
      line: 1,
      column: 1,
      type: 'UTF-8 BOM Header',
      char: '\\uFEFF',
      snippet: 'File starts with Byte Order Mark (BOM). Must be pure UTF-8 without BOM.'
    });
  }

  const content = buffer.toString('utf-8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    // Skip checker script self-examination
    if (relPath.includes('check-encoding.js') || relPath.includes('check-mojibake.js')) return;

    // 2. Check for mojibake / corrupted symbols
    MOJIBAKE_REGEX.lastIndex = 0;
    let match;
    while ((match = MOJIBAKE_REGEX.exec(line)) !== null) {
      violations.push({
        file: relPath,
        line: index + 1,
        column: match.index + 1,
        type: 'Mojibake / Corrupted Character',
        char: match[0],
        snippet: line.trim()
      });
    }

    // 3. In TSX / TS files, disallow raw emojis to ensure platform consistency and avoid transcoding corruption
    if (relPath.endsWith('.tsx') || relPath.endsWith('.ts')) {
      // Regex for emoji ranges & surrogate pairs
      const emojiMatch = line.match(/(?:[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g);
      if (emojiMatch) {
        // Filter out allowed standard symbols:
        // Indian Rupee (₹), dashes (—, –), bullets (•), middle dots (·), copyright (©)
        const filtered = emojiMatch.filter(ch => !['₹', '—', '–', '•', '·', '©', '“', '”', '‘', '’', '●', '×'].includes(ch));
        if (filtered.length > 0) {
          violations.push({
            file: relPath,
            line: index + 1,
            column: 1,
            type: 'Raw Emoji (Prefer Lucide Vector SVG Icon)',
            char: filtered.join(' '),
            snippet: line.trim()
          });
        }
      }
    }
  });
}

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(projectRoot, fullPath);

    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        scanDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SCAN_EXTENSIONS.has(ext)) {
        totalFilesChecked++;
        checkFile(fullPath, relPath);
      }
    }
  }
}

console.log('🔍 Running repository character encoding and symbol validation...');
scanDirectory(projectRoot);

if (violations.length > 0) {
  console.error(`\n❌ Found ${violations.length} encoding / symbol violation(s):\n`);
  violations.forEach((v) => {
    console.error(`  [${v.type}] ${v.file}:${v.line}:${v.column}`);
    console.error(`  Symbol: "${v.char}"`);
    console.error(`  Line:   "${v.snippet}"\n`);
  });
  console.error('Build aborted: Please resolve the above issues before committing or deploying.\n');
  process.exit(1);
} else {
  console.log(`\n✅ Verified ${totalFilesChecked} files: 0 corrupted symbols, 0 BOMs, 0 mojibake detected.`);
  console.log('All files are 100% clean UTF-8.\n');
  process.exit(0);
}
