import { Question } from '../data/questions';

export const QUESTIONS_PER_GAME = 5;

export interface PlayableQuestion {
  source: Question;
  choices: string[];
  answerIndex: number;
}

export type Rng = () => number;

export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function toPlayable(question: Question, rng: Rng = Math.random): PlayableQuestion {
  const choices = shuffle([question.correct, ...question.wrong], rng);
  return { source: question, choices, answerIndex: choices.indexOf(question.correct) };
}

export function pickQuestions(
  pool: readonly Question[],
  count = QUESTIONS_PER_GAME,
  rng: Rng = Math.random,
): PlayableQuestion[] {
  return shuffle(pool, rng)
    .slice(0, count)
    .map((q) => toPlayable(q, rng));
}

export function countCorrect(
  questions: readonly PlayableQuestion[],
  answers: readonly (number | null)[],
): number {
  return questions.filter((q, i) => answers[i] === q.answerIndex).length;
}

export function rankFor(score: number, total: number): string {
  const ratio = total === 0 ? 0 : score / total;
  if (ratio === 1) return 'Anthropic数列の番人';
  if (ratio >= 0.8) return 'リリースノート常駐者';
  if (ratio >= 0.6) return 'モデル選択メニューの常連';
  if (ratio >= 0.4) return '小数点に翻弄される人';
  if (ratio > 0) return '次は6だと信じている人';
  return 'Claude 3 で時が止まっている人';
}
