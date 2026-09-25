export interface ThirdPartyLicense {
  name: string;
  license: string;
  text: string;
}

/** File emitted by `ng build` (extractLicenses) and copied next to index.html for deployment. */
export const THIRD_PARTY_LICENSES_FILE = '3rdpartylicenses.txt';

const SEPARATOR = /^-{20,}$/m;

/** Parses the `3rdpartylicenses.txt` that the Angular CLI writes for bundled packages. */
export function parseThirdPartyLicenses(source: string): ThirdPartyLicense[] {
  return source
    .split(SEPARATOR)
    .map((block) => block.trim())
    .filter((block) => block.startsWith('Package:'))
    .map((block) => {
      const [packageLine = '', licenseLine = '', ...rest] = block.split('\n');
      return {
        name: packageLine.replace(/^Package:\s*/, '').trim(),
        license: licenseLine
          .replace(/^License:\s*/, '')
          .replace(/^"|"$/g, '')
          .trim(),
        text: rest.join('\n').trim(),
      };
    });
}
