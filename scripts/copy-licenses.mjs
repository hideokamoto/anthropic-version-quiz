// Publishes the third-party license file that `ng build` writes outside the served folder,
// so the in-app license page can load it.
import { copyFileSync, existsSync } from 'node:fs';

const from = 'dist/anthropic-version-quiz/3rdpartylicenses.txt';
const to = 'dist/anthropic-version-quiz/browser/3rdpartylicenses.txt';

if (!existsSync(from)) {
  console.error(`${from} not found. Run a production build first.`);
  process.exit(1);
}
copyFileSync(from, to);
console.log(`Copied ${from} -> ${to}`);
