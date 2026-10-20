import { Question } from '../data/questions';
import { Text } from '../i18n/i18n';

export const QUESTIONS_PER_GAME = 5;

export interface PlayableQuestion {
  source: Question;
  choices: Text[];
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

export function rankFor(score: number, total: number): Text {
  const ratio = total === 0 ? 0 : score / total;
  if (ratio === 1) return { ja: 'Anthropic数列の番人', en: 'Keeper of the Anthropic Sequence' };
  if (ratio >= 0.8) return { ja: 'リリースノート常駐者', en: 'Lives in the release notes' };
  if (ratio >= 0.6) return { ja: 'モデル選択メニューの常連', en: 'Model picker regular' };
  if (ratio >= 0.4) return { ja: '小数点に翻弄される人', en: 'Lost in the decimal points' };
  if (ratio > 0) return { ja: '次は6だと信じている人', en: 'Sure the next one is 6' };
  return { ja: 'Claude 3 で時が止まっている人', en: 'Still stuck at Claude 3' };
}
