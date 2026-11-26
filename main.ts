// China in Numbers — hand-in program (Node 22, standard library only).
//
// The site itself is the static folder app/ beside this file: plain HTML, CSS
// and JavaScript that a browser opens at app/index.html and that loads nothing
// over the network. This program hands the entry in: it copies app/ and
// screenshots/ into the output directory and writes dossier.json there with
// buildDossier from the vendored make.fun library. vendor/makefun-frontend.ts
// stays byte for byte the kit's copy — the scorer rebuilds the dossier with
// its own copy and compares the two.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The caps mirror the scorer's own limits: at most 4 screenshots of at most
// 256 KiB each, at most 993 files and directories in app/ and 16 MiB of app
// files, and a dossier text capped at 160 KiB.
const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(out, 'dossier.json'), dossier);
console.log(`China in Numbers handed in: app/ and screenshots/ copied to ${out}, dossier.json written (${dossier.length} bytes).`);
