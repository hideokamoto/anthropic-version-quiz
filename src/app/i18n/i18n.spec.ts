import { detectLang, tr } from './i18n';

describe('detectLang', () => {
  it('prefers ?lang= in the URL', () => {
    expect(detectLang('?lang=en', 'ja', ['ja-JP'])).toBe('en');
    expect(detectLang('?lang=ja', 'en', ['en-US'])).toBe('ja');
  });

  it('falls back to the saved choice, then the browser language', () => {
    expect(detectLang('', 'en', ['ja-JP'])).toBe('en');
    expect(detectLang('', null, ['ja-JP', 'en'])).toBe('ja');
    expect(detectLang('', null, ['en-US', 'ja'])).toBe('en');
    expect(detectLang('', null, ['fr-FR', 'ja'])).toBe('ja');
    expect(detectLang('', null, ['en-US'])).toBe('en');
    expect(detectLang('', null, [])).toBe('en');
  });

  it('ignores unknown values', () => {
    expect(detectLang('?lang=fr', 'de', ['fr-FR'])).toBe('en');
  });
});

describe('tr', () => {
  it('returns plain strings as-is and picks the language otherwise', () => {
    expect(tr('claude-opus-4-8', 'en')).toBe('claude-opus-4-8');
    expect(tr({ ja: '正解', en: 'Correct' }, 'ja')).toBe('正解');
    expect(tr({ ja: '正解', en: 'Correct' }, 'en')).toBe('Correct');
  });
});
