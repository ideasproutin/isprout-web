const fs = require('fs');
const path = require('path');
const root = 'src';
const exts = new Set(['.tsx', '.ts', '.jsx', '.js', '.html']);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (!exts.has(path.extname(entry.name))) continue;

    const text = fs.readFileSync(full, 'utf8');
    let i = 0;
    while ((i = text.indexOf('<img', i)) !== -1) {
      const start = i;
      let j = i;
      let quote = null;

      while (j < text.length) {
        const ch = text[j];
        if (quote) {
          if (ch === quote && text[j - 1] !== '\\') quote = null;
        } else {
          if (ch === '"' || ch === "'") quote = ch;
          else if (ch === '>') {
            j++;
            break;
          }
        }
        j++;
      }

      const tag = text.slice(start, j);
      const line = text.slice(0, start).split(/\r?\n/).length;
      const hasW = /\bwidth\s*=/.test(tag);
      const hasH = /\bheight\s*=/.test(tag);
      if (!hasW || !hasH) {
        console.log(`${full}:${line}:${hasW ? 'w' : '-'}${hasH ? 'h' : '-'}:${tag.replace(/\s+/g, ' ').slice(0, 220)}`);
      }

      i = j;
    }
  }
}

walk(root);
