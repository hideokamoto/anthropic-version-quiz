import { Question } from '../data/questions';
import { countCorrect, pickQuestions, rankFor, shuffle, toPlayable } from './game';

function seeded(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
}

const sample = (id: string): Question => ({
  id,
  mode: 'ui',
  question: `q${id}`,
  correct: `ok${id}`,
  wrong: [`x${id}`, `y${id}`, `z${id}`],
  explanation: '',
  docs: [],
  sources: [],
});

describe('game', () => {
  it('shuffle keeps every item', () => {
    const items = [1, 2, 3, 4, 5, 6];
    expect(shuffle(items, seeded(1)).sort()).toEqual(items);
  });

  it('toPlayable points answerIndex at the correct choice', () => {
    for (let seed = 1; seed < 20; seed++) {
      const p = toPlayable(sample('1'), seeded(seed));
      expect(p.choices[p.answerIndex]).toBe('ok1');
      expect(p.choices).toHaveLength(4);
    }
  });

  it('pickQuestions returns the requested number of distinct questions', () => {
    const pool = Array.from({ length: 12 }, (_, i) => sample(String(i)));
    const picked = pickQuestions(pool, 5, seeded(7));
    expect(picked).toHaveLength(5);
    expect(new Set(picked.map((p) => p.source.id)).size).toBe(5);
  });

  it('pickQuestions never returns more than the pool', () => {
    expect(pickQuestions([sample('a'), sample('b')], 5)).toHaveLength(2);
  });

  it('countCorrect counts matching answers only', () => {
    const qs = [toPlayable(sample('a')), toPlayable(sample('b'))];
    expect(countCorrect(qs, [qs[0].answerIndex, (qs[1].answerIndex + 1) % 4])).toBe(1);
    expect(countCorrect(qs, [null, null])).toBe(0);
  });

  it('rankFor gives the top title only for a perfect score', () => {
    expect(rankFor(5, 5)).toBe('Anthropic数列の番人');
    expect(rankFor(4, 5)).not.toBe('Anthropic数列の番人');
    expect(rankFor(0, 5)).toBe('Claude 3 で時が止まっている人');
  });
});
