import { TestBed } from '@angular/core/testing';
import { QUESTIONS_PER_GAME } from './game';
import { QuizStore } from './quiz-store';

describe('QuizStore', () => {
  let store: QuizStore;

  beforeEach(() => {
    localStorage.clear();
    store = TestBed.inject(QuizStore);
  });

  it('plays a full game and records the best score', () => {
    store.start('api');
    expect(store.questions()).toHaveLength(QUESTIONS_PER_GAME);
    expect(store.questions().every((q) => q.source.mode === 'api')).toBe(true);

    for (let i = 0; i < QUESTIONS_PER_GAME; i++) {
      store.answer(store.current()!.answerIndex);
      if (i < QUESTIONS_PER_GAME - 1) expect(store.next()).toBe(true);
    }

    expect(store.finished()).toBe(true);
    expect(store.score()).toBe(QUESTIONS_PER_GAME);
    expect(store.next()).toBe(false);
    expect(store.best('api')).toBe(QUESTIONS_PER_GAME);
    expect(store.best('ui')).toBeNull();
  });

  it('ignores a second answer to the same question', () => {
    store.start('ui');
    const wrong = (store.current()!.answerIndex + 1) % 4;
    store.answer(wrong);
    store.answer(store.current()!.answerIndex);
    expect(store.currentAnswer()).toBe(wrong);
  });

  it('does not lower an existing best score', () => {
    localStorage.setItem('anthropic-version-quiz:best:ui', '5');
    store.start('ui');
    for (let i = 0; i < QUESTIONS_PER_GAME; i++) {
      store.answer((store.current()!.answerIndex + 1) % 4);
      store.next();
    }
    expect(store.best('ui')).toBe(5);
  });
});
