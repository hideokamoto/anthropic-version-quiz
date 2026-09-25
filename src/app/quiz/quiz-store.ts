import { computed, Injectable, signal } from '@angular/core';
import { QuizMode, questionsFor } from '../data/questions';
import { countCorrect, pickQuestions, PlayableQuestion } from './game';

export const MODE_LABELS: Record<QuizMode, string> = {
  ui: 'claude.ai モード',
  api: 'API モード',
};

const BEST_KEY = (mode: QuizMode) => `anthropic-version-quiz:best:${mode}`;

function readBest(mode: QuizMode): number | null {
  try {
    const raw = localStorage.getItem(BEST_KEY(mode));
    const value = raw === null ? NaN : Number(raw);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function writeBest(mode: QuizMode, score: number): void {
  try {
    localStorage.setItem(BEST_KEY(mode), String(score));
  } catch {
    // Storage unavailable (private mode etc.): best score just isn't kept.
  }
}

@Injectable({ providedIn: 'root' })
export class QuizStore {
  readonly mode = signal<QuizMode | null>(null);
  readonly questions = signal<PlayableQuestion[]>([]);
  readonly answers = signal<(number | null)[]>([]);
  readonly index = signal(0);

  readonly current = computed(() => this.questions()[this.index()] ?? null);
  readonly currentAnswer = computed(() => this.answers()[this.index()] ?? null);
  readonly score = computed(() => countCorrect(this.questions(), this.answers()));
  readonly finished = computed(
    () => this.questions().length > 0 && this.answers().every((a) => a !== null),
  );

  start(mode: QuizMode): void {
    const questions = pickQuestions(questionsFor(mode));
    this.mode.set(mode);
    this.questions.set(questions);
    this.answers.set(questions.map(() => null));
    this.index.set(0);
  }

  answer(choice: number): void {
    if (this.currentAnswer() !== null) return;
    this.answers.update((list) => list.map((a, i) => (i === this.index() ? choice : a)));
    if (this.finished()) this.saveBest();
  }

  next(): boolean {
    if (this.index() >= this.questions().length - 1) return false;
    this.index.update((i) => i + 1);
    return true;
  }

  best(mode: QuizMode): number | null {
    return readBest(mode);
  }

  private saveBest(): void {
    const mode = this.mode();
    if (!mode) return;
    const previous = readBest(mode);
    if (previous === null || this.score() > previous) writeBest(mode, this.score());
  }
}
