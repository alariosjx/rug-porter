/**
 * scripts/generate-photo-data.js
 *
 * Reads IPTC metadata embedded in every JPEG in static/images/
 * and writes src/lib/data/photos.json.
 *
 * Run: node scripts/generate-photo-data.js
 * Or via npm: npm run photos
 *
 * Fields extracted (IPTC Record 2):
 *   Caption (0x78)  — full wire-service caption
 *   Headline (0x69) — short headline if present
 *   City (0x5A), ProvinceState (0x5F), Country (0x65)
 *   DateCreated (0x37)
 *   Credit (0x6E)   — "Andres Jimenez Larios/Bay City News"
 *   Keywords (0x19)
 *   CopyrightNotice (0x74)
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const IMG_DIR   = path.join(ROOT, 'static', 'images');
const OUT_DIR   = path.join(ROOT, 'src', 'lib', 'data');
const OUT_FILE  = path.join(OUT_DIR, 'photos.json');

// ── IPTC tag number → friendly name ─────────────────────────────
const IPTC_TAGS = {
  0x05: 'title',
  0x19: 'keywords',
  0x37: 'dateCreated',
  0x3C: 'timeCreated',
  0x50: 'byline',
  0x55: 'bylineTitle',
  0x5A: 'city',
  0x5C: 'subLocation',
  0x5F: 'provinceState',
  0x64: 'countryCode',
  0x65: 'country',
  0x69: 'headline',
  0x6E: 'credit',
  0x73: 'source',
  0x74: 'copyright',
  0x78: 'caption',
  0x7A: 'writerEditor',
};

// ── Parse IPTC from JPEG buffer ──────────────────────────────────
function parseIPTC(buf) {
  const result = {};
  let i = 2; // skip FF D8

  while (i < buf.length - 4) {
    if (buf[i] !== 0xFF) { i++; continue; }
    const marker = buf[i + 1];

    // Need at least 2 bytes for length
    if (i + 3 >= buf.length) break;
    const segLen = buf.readUInt16BE(i + 2);

    if (marker === 0xED) {
      // APP13 — Photoshop / IPTC block
      const seg = buf.slice(i + 4, i + 2 + segLen);
      const psIdx = seg.indexOf(Buffer.from('Photoshop 3.0\0'));
      if (psIdx >= 0) {
        let j = psIdx + 14;
        // Walk the 8BIM resource blocks
        while (j < seg.length - 8) {
          if (seg.slice(j, j + 4).toString('ascii') !== '8BIM') { j++; continue; }
          const resourceID = seg.readUInt16BE(j + 4);
          const nameLen    = seg[j + 6];
          const paddedName = nameLen % 2 === 0 ? nameLen + 2 : nameLen + 1;
          const dataStart  = j + 6 + paddedName;
          if (dataStart + 4 > seg.length) break;
          const dataLen    = seg.readUInt32BE(dataStart);
          const dataEnd    = dataStart + 4 + dataLen;

          if (resourceID === 0x0404) {
            // IPTC-NAA data block
            let k = dataStart + 4;
            while (k < dataEnd - 4) {
              if (seg[k] !== 0x1C) { k++; continue; }
              if (seg[k + 1] !== 0x02) { k += 2; continue; }
              const tagNum  = seg[k + 2];
              const fldLen  = seg.readUInt16BE(k + 3);
              const value   = seg.slice(k + 5, k + 5 + fldLen)
                                 .toString('utf8')
                                 .replace(/\0/g, '')
                                 .trim();
              const name = IPTC_TAGS[tagNum];
              if (name && value) {
                // keywords can appear multiple times → array
                if (name === 'keywords') {
                  result.keywords = result.keywords
                    ? result.keywords + ', ' + value
                    : value;
                } else {
                  result[name] = result[name] || value; // first wins
                }
              }
              k += 5 + fldLen;
            }
          }
          j = dataEnd % 2 === 0 ? dataEnd : dataEnd + 1; // pad to even
        }
      }
    }

    i += 2 + segLen;
  }

  return result;
}

// ── Format IPTC date "20260501" → "May 1, 2026" ─────────────────
function formatDate(d) {
  if (!d || d.length < 8) return '';
  const year  = d.slice(0, 4);
  const month = parseInt(d.slice(4, 6), 10);
  const day   = parseInt(d.slice(6, 8), 10);
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
                   'Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[month - 1]} ${day}, ${year}`;
}

// ── Build location string ─────────────────────────────────────────
function buildLocation(meta, date) {
  const parts = [meta.city, meta.provinceState, meta.country]
    .filter(Boolean)
    .join(', ');
  const d = formatDate(date || meta.dateCreated);
  return [parts, d].filter(Boolean).join(' · ');
}

// ── Determine gallery from filename prefix ────────────────────────
function gallery(filename) {
  if (filename.startsWith('rugby-')) return 'rugby';
  return 'reporting';
}

// ── Main ─────────────────────────────────────────────────────────
const files = readdirSync(IMG_DIR)
  .filter(f => /\.(jpe?g|jpg)$/i.test(f))
  .sort();

const photos = [];

for (const file of files) {
  const buf  = readFileSync(path.join(IMG_DIR, file));
  const meta = parseIPTC(buf);

  photos.push({
    src:      `/images/${file}`,
    gallery:  gallery(file),
    // Caption: full IPTC caption if present, else headline, else filename
    caption:  meta.caption || meta.headline || meta.title || file.replace(/\.[^.]+$/, ''),
    // Short label for the overlay (first sentence of caption, max 80 chars)
    label:    (meta.caption || meta.headline || '')
                .split(/[.!?]/)[0]
                .trim()
                .slice(0, 80) || file,
    location: buildLocation(meta),
    credit:   meta.credit || meta.source || '',
    copyright: meta.copyright || '',
    date:     meta.dateCreated || '',
    keywords: meta.keywords || '',
    // alt text = full caption for screen readers; fallback to filename
    alt:      meta.caption || meta.headline || file,
  });
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(photos, null, 2));

console.log(`✓ Generated ${photos.length} photo entries → src/lib/data/photos.json`);
console.log(`  Reporting: ${photos.filter(p => p.gallery === 'reporting').length}`);
console.log(`  Rugby:     ${photos.filter(p => p.gallery === 'rugby').length}`);

// Print a sample to verify
const sample = photos.find(p => p.caption.length > 30);
if (sample) {
  console.log('\nSample entry:');
  console.log(`  File:     ${sample.src}`);
  console.log(`  Caption:  ${sample.caption.slice(0, 100)}…`);
  console.log(`  Location: ${sample.location}`);
  console.log(`  Credit:   ${sample.credit}`);
}
