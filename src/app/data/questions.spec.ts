import { QUESTIONS, questionsFor } from './questions';
import { QUESTIONS_PER_GAME } from '../quiz/game';

describe('question data', () => {
  it('has unique ids', () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has enough questions per mode for several different games', () => {
    expect(questionsFor('ui').length).toBeGreaterThanOrEqual(QUESTIONS_PER_GAME * 4);
    expect(questionsFor('api').length).toBeGreaterThanOrEqual(QUESTIONS_PER_GAME * 4);
  });

  it.each(QUESTIONS.map((q) => [q.id, q] as const))('%s has four distinct choices', (_id, q) => {
    const choices = [q.correct, ...q.wrong];
    expect(new Set(choices).size).toBe(4);
    expect(choices.every((c) => c.trim().length > 0)).toBe(true);
  });

  it.each(QUESTIONS.map((q) => [q.id, q] as const))(
    '%s links official docs and sources over https',
    (_id, q) => {
      expect(q.docs.length).toBeGreaterThan(0);
      expect(q.sources.length).toBeGreaterThan(0);
      for (const link of [...q.docs, ...q.sources]) {
        expect(link.url).toMatch(
          /^https:\/\/(platform\.claude\.com|support\.claude\.com|www\.anthropic\.com)\//,
        );
        expect(link.label.length).toBeGreaterThan(0);
      }
    },
  );
});
