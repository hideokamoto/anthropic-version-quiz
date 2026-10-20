import { LANGS, Text, tr } from '../i18n/i18n';
import { QUESTIONS_PER_GAME } from '../quiz/game';
import { QUESTIONS, questionsFor } from './questions';
import { SEQUENCE } from './sequence';

/** A plain string is shown untranslated, so it must not be Japanese. */
const JAPANESE = /[぀-ヿ㐀-鿿！-｠]/;

function expectTranslated(text: Text): void {
  if (typeof text === 'string') {
    expect(text).not.toMatch(JAPANESE);
    return;
  }
  expect(text.ja.trim().length).toBeGreaterThan(0);
  expect(text.en.trim().length).toBeGreaterThan(0);
  expect(text.en).not.toMatch(JAPANESE);
}

describe('question data', () => {
  it('has unique ids', () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has enough questions per mode for several different games', () => {
    expect(questionsFor('ui').length).toBeGreaterThanOrEqual(QUESTIONS_PER_GAME * 4);
    expect(questionsFor('api').length).toBeGreaterThanOrEqual(QUESTIONS_PER_GAME * 4);
  });

  it.each(QUESTIONS.map((q) => [q.id, q] as const))(
    '%s has four distinct choices in every language',
    (_id, q) => {
      for (const lang of LANGS) {
        const choices = [q.correct, ...q.wrong].map((c) => tr(c, lang));
        expect(new Set(choices).size).toBe(4);
        expect(choices.every((c) => c.trim().length > 0)).toBe(true);
      }
    },
  );

  it.each(QUESTIONS.map((q) => [q.id, q] as const))(
    '%s is written in both Japanese and English',
    (_id, q) => {
      for (const text of [q.question, q.correct, ...q.wrong, q.explanation]) {
        expectTranslated(text);
      }
    },
  );

  it.each(QUESTIONS.map((q) => [q.id, q] as const))(
    '%s links official docs and sources over https',
    (_id, q) => {
      expect(q.docs.length).toBeGreaterThan(0);
      expect(q.sources.length).toBeGreaterThan(0);
      for (const link of [...q.docs, ...q.sources]) {
        expect(link.url).toMatch(
          /^https:\/\/(platform\.claude\.com|support\.claude\.com|www\.anthropic\.com)\//,
        );
        expectTranslated(link.label);
      }
    },
  );

  it('has the sequence table in both languages', () => {
    for (const row of SEQUENCE) {
      expectTranslated(row.models);
      expectTranslated(row.date);
      row.links.forEach((link) => expectTranslated(link.label));
    }
  });
});
