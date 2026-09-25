import { parseThirdPartyLicenses } from './third-party';

const SAMPLE = `
--------------------------------------------------------------------------------
Package: @angular/core
License: "MIT"

The MIT License

Copyright (c) Google LLC.

--------------------------------------------------------------------------------
Package: tslib
License: "0BSD"

Copyright (c) Microsoft Corporation.

--------------------------------------------------------------------------------
`;

describe('parseThirdPartyLicenses', () => {
  it('extracts package name, license id and full text', () => {
    expect(parseThirdPartyLicenses(SAMPLE)).toEqual([
      {
        name: '@angular/core',
        license: 'MIT',
        text: 'The MIT License\n\nCopyright (c) Google LLC.',
      },
      { name: 'tslib', license: '0BSD', text: 'Copyright (c) Microsoft Corporation.' },
    ]);
  });

  it('returns an empty list for unrelated content', () => {
    expect(parseThirdPartyLicenses('<!doctype html><html></html>')).toEqual([]);
  });
});
