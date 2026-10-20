import { Text } from '../i18n/i18n';
import { DOC_LINKS as D, Link, modelPage as mp, NEWS_LINKS as N } from './links';

export type QuizMode = 'ui' | 'api';

export interface Question {
  id: string;
  mode: QuizMode;
  question: Text;
  correct: Text;
  wrong: [Text, Text, Text];
  explanation: Text;
  /** Official docs / announcements for the version the question is about. */
  docs: Link[];
  /** Pages the answer was verified against. */
  sources: Link[];
}

/** Date the facts below were checked against the linked pages. */
export const VERIFIED_AT = '2026-09-29';

const UI: Question[] = [
  {
    id: 'U1',
    mode: 'ui',
    question: {
      ja: '数列の「4.1」を名乗ったモデルは？',
      en: 'Which model took the “4.1” slot in the sequence?',
    },
    correct: { ja: 'Opus 4.1 だけ', en: 'Only Opus 4.1' },
    wrong: [
      { ja: 'Sonnet 4.1 だけ', en: 'Only Sonnet 4.1' },
      { ja: 'Haiku 4.1 だけ', en: 'Only Haiku 4.1' },
      { ja: 'Opus 4.1 と Sonnet 4.1', en: 'Opus 4.1 and Sonnet 4.1' },
    ],
    explanation: {
      ja: '「4.1」は Opus だけです。2025年8月5日に Opus 4 の改良版として公開されました。',
      en: 'Only Opus took “4.1”. It was released on August 5, 2025 as an upgrade to Opus 4.',
    },
    docs: [N.opus41],
    sources: [D.releaseNotes, D.pricing],
  },
  {
    id: 'U2',
    mode: 'ui',
    question: {
      ja: '数列の「4.7」を名乗ったモデルは？',
      en: 'Which model took the “4.7” slot in the sequence?',
    },
    correct: { ja: 'Opus 4.7 だけ', en: 'Only Opus 4.7' },
    wrong: [
      { ja: 'Sonnet 4.7 だけ', en: 'Only Sonnet 4.7' },
      { ja: 'Opus 4.7 と Sonnet 4.7', en: 'Opus 4.7 and Sonnet 4.7' },
      { ja: 'Opus・Sonnet・Haiku の 4.7', en: 'Opus, Sonnet and Haiku 4.7' },
    ],
    explanation: {
      ja: '「4.7」は Opus のみです（2026年4月16日公開）。Sonnet 4.7 は存在しません。',
      en: 'Only Opus took “4.7” (released April 16, 2026). There is no Sonnet 4.7.',
    },
    docs: [mp('opus-4-7'), N.opus47],
    sources: [D.releaseNotes, D.deprecations],
  },
  {
    id: 'U3',
    mode: 'ui',
    question: {
      ja: '数列の「4.8」を名乗ったモデルは？',
      en: 'Which model took the “4.8” slot in the sequence?',
    },
    correct: { ja: 'Opus 4.8 だけ', en: 'Only Opus 4.8' },
    wrong: [
      { ja: 'Sonnet 4.8 だけ', en: 'Only Sonnet 4.8' },
      { ja: 'Opus 4.8 と Sonnet 4.8', en: 'Opus 4.8 and Sonnet 4.8' },
      { ja: 'Fable 4.8 だけ', en: 'Only Fable 4.8' },
    ],
    explanation: {
      ja: '「4.8」も Opus のみです（2026年5月28日公開）。',
      en: '“4.8” is also Opus only (released May 28, 2026).',
    },
    docs: [mp('opus-4-8'), N.opus48],
    sources: [D.releaseNotes, D.deprecations],
  },
  {
    id: 'U4',
    mode: 'ui',
    question: {
      ja: '「4.5」世代で最初に公開されたモデルは？',
      en: 'Which model came out first in the 4.5 generation?',
    },
    correct: 'Sonnet 4.5',
    wrong: ['Haiku 4.5', 'Opus 4.5', { ja: '3つとも同じ日', en: 'All three on the same day' }],
    explanation: {
      ja: 'Sonnet 4.5（2025/9/29）→ Haiku 4.5（10/15）→ Opus 4.5（11/24）の順です。',
      en: 'The order was Sonnet 4.5 (Sep 29, 2025) → Haiku 4.5 (Oct 15) → Opus 4.5 (Nov 24).',
    },
    docs: [mp('sonnet-4-5'), mp('haiku-4-5'), mp('opus-4-5')],
    sources: [D.releaseNotes],
  },
  {
    id: 'U5',
    mode: 'ui',
    question: {
      ja: '「4.6」世代で先に公開されたモデルは？',
      en: 'Which model came out first in the 4.6 generation?',
    },
    correct: 'Opus 4.6',
    wrong: [
      'Sonnet 4.6',
      { ja: 'Opus 4.6 と Sonnet 4.6 は同じ日', en: 'Opus 4.6 and Sonnet 4.6 on the same day' },
      'Haiku 4.6',
    ],
    explanation: {
      ja: 'Opus 4.6 が2026年2月5日、Sonnet 4.6 が2月17日です。Haiku 4.6 はありません。',
      en: 'Opus 4.6 came out on February 5, 2026 and Sonnet 4.6 on February 17. There is no Haiku 4.6.',
    },
    docs: [mp('opus-4-6'), mp('sonnet-4-6'), D.whatsNew46],
    sources: [D.releaseNotes],
  },
  {
    id: 'U6',
    mode: 'ui',
    question: {
      ja: '「5」世代で最初に公開されたモデルは？',
      en: 'Which model came out first in the 5 generation?',
    },
    correct: 'Fable 5',
    wrong: ['Sonnet 5', 'Opus 5', 'Haiku 5'],
    explanation: {
      ja: 'Fable 5（と Mythos 5）が2026年6月9日、Sonnet 5 が6月30日、Opus 5 が7月24日です。',
      en: 'Fable 5 (together with Mythos 5) came out on June 9, 2026, Sonnet 5 on June 30, and Opus 5 on July 24.',
    },
    docs: [mp('fable-5'), mp('sonnet-5'), mp('opus-5')],
    sources: [D.releaseNotes],
  },
  {
    id: 'U7',
    mode: 'ui',
    question: {
      ja: '数列の「5.1」に当たるモデルは？',
      en: 'Which models make up “5.1” in the sequence?',
    },
    correct: { ja: 'Fable 5.1 と Mythos 5.1', en: 'Fable 5.1 and Mythos 5.1' },
    wrong: ['Opus 5.1', 'Sonnet 5.1', 'Haiku 5.1'],
    explanation: {
      ja: '2026年9月1日に Fable 5.1 と Mythos 5.1 が同時に公開されました。',
      en: 'Fable 5.1 and Mythos 5.1 were released together on September 1, 2026.',
    },
    docs: [mp('fable-5-1'), mp('mythos-5-1'), N.fable51],
    sources: [D.releaseNotes],
  },
  {
    id: 'U8',
    mode: 'ui',
    question: {
      ja: '「Claude 5.5 ファミリー」の最初のモデルは？',
      en: 'Which was the first model of the “Claude 5.5 family”?',
    },
    correct: 'Opus 5.5',
    wrong: ['Fable 5.5', 'Sonnet 5.5', 'Mythos 5.5'],
    explanation: {
      ja: '2026年9月22日のリリースノートに "the first model in our new Claude 5.5 family" と書かれています。Sonnet 5.5 はその6日後の9月28日に公開されました。',
      en: 'The release notes of September 22, 2026 call it "the first model in our new Claude 5.5 family". Sonnet 5.5 followed six days later, on September 28.',
    },
    docs: [mp('opus-5-5'), N.opus55],
    sources: [D.claudeAiReleaseNotes],
  },
  {
    id: 'U9',
    mode: 'ui',
    question: {
      ja: '公式の料金表に載っていないモデル名は？',
      en: 'Which model name does not appear on the official pricing page?',
    },
    correct: 'Haiku 4',
    wrong: ['Haiku 4.5', 'Haiku 3.5', 'Sonnet 4'],
    explanation: {
      ja: 'Haiku は 3 → 3.5 → 4.5 と進みました。Haiku 4 は料金表にも廃止予定表にも載っていません（2026年9月時点）。',
      en: 'Haiku went 3 → 3.5 → 4.5. Haiku 4 appears on neither the pricing page nor the deprecations page (as of September 2026).',
    },
    docs: [mp('haiku-4-5'), N.haiku45],
    sources: [D.pricing, D.deprecations],
  },
  {
    id: 'U10',
    mode: 'ui',
    question: {
      ja: 'Claude 3 ファミリー（2024年3月発表）を、発表での「性能の低い順」に並べると？',
      en: 'How did the Claude 3 announcement (March 2024) order the family, from least to most capable?',
    },
    correct: 'Haiku → Sonnet → Opus',
    wrong: ['Sonnet → Haiku → Opus', 'Opus → Sonnet → Haiku', 'Haiku → Opus → Sonnet'],
    explanation: {
      ja: '発表文に "in ascending order of capability: Claude 3 Haiku, Claude 3 Sonnet, and Claude 3 Opus" とあります。',
      en: 'The announcement says "in ascending order of capability: Claude 3 Haiku, Claude 3 Sonnet, and Claude 3 Opus".',
    },
    docs: [N.claude3],
    sources: [N.claude3],
  },
  {
    id: 'U11',
    mode: 'ui',
    question: {
      ja: 'Claude 3.5 Sonnet の発表時、claude.ai ではどう提供された？',
      en: 'How was Claude 3.5 Sonnet offered on claude.ai at launch?',
    },
    correct: { ja: '無料で使えた', en: 'Free to use' },
    wrong: [
      { ja: 'Pro プラン限定', en: 'Pro plan only' },
      { ja: 'API 限定', en: 'API only' },
      { ja: '招待制', en: 'Invite only' },
    ],
    explanation: {
      ja: '発表文に "now available for free on Claude.ai" とあります。',
      en: 'The announcement says "now available for free on Claude.ai".',
    },
    docs: [N.sonnet35],
    sources: [N.sonnet35],
  },
  {
    id: 'U12',
    mode: 'ui',
    question: {
      ja: '通称「3.5v2」を、Anthropic は発表時に何と呼んだ？',
      en: 'What did Anthropic call the model nicknamed “3.5v2” when it was announced?',
    },
    correct: 'upgraded Claude 3.5 Sonnet',
    wrong: ['Claude 3.6 Sonnet', 'Claude 3.5 Sonnet v2', 'Claude 3.5 Sonnet Pro'],
    explanation: {
      ja: '発表記事のタイトルは "a new Claude 3.5 Sonnet"、本文では "upgraded Claude 3.5 Sonnet" です。「3.5v2」も「3.6」も公式の名前ではありません。',
      en: 'The announcement is titled "a new Claude 3.5 Sonnet", and the text says "upgraded Claude 3.5 Sonnet". Neither “3.5v2” nor “3.6” is an official name.',
    },
    docs: [N.sonnet35v2],
    sources: [N.sonnet35v2],
  },
  {
    id: 'U13',
    mode: 'ui',
    question: {
      ja: 'Claude 3.7 Sonnet と同時に発表されたものは？',
      en: 'What was announced together with Claude 3.7 Sonnet?',
    },
    correct: 'Claude Code',
    wrong: ['Claude Design', 'Computer use', 'Artifacts'],
    explanation: {
      ja: '発表記事のタイトルが "Claude 3.7 Sonnet and Claude Code" です（2025年2月24日）。',
      en: 'The announcement is titled "Claude 3.7 Sonnet and Claude Code" (February 24, 2025).',
    },
    docs: [N.sonnet37],
    sources: [N.sonnet37],
  },
  {
    id: 'U14',
    mode: 'ui',
    question: {
      ja: 'Claude 3.7 Sonnet が発表時に名乗った「市場初」は？',
      en: 'What “first on the market” did Claude 3.7 Sonnet claim at launch?',
    },
    correct: { ja: '初のハイブリッド推論モデル', en: 'The first hybrid reasoning model' },
    wrong: [
      { ja: '初の 1M トークンコンテキスト', en: 'The first 1M-token context' },
      { ja: '初の画像生成対応', en: 'The first with image generation' },
      { ja: '初の音声入力対応', en: 'The first with voice input' },
    ],
    explanation: {
      ja: '発表文に "the first hybrid reasoning model on the market" とあります。',
      en: 'The announcement says "the first hybrid reasoning model on the market".',
    },
    docs: [N.sonnet37],
    sources: [N.sonnet37],
  },
  {
    id: 'U15',
    mode: 'ui',
    question: {
      ja: '3.7 の次の世代で、モデル名の語順はどう変わった？',
      en: 'How did the word order of model names change in the generation after 3.7?',
    },
    correct: {
      ja: '「Claude 3.7 Sonnet」→「Claude Sonnet 4」',
      en: '“Claude 3.7 Sonnet” → “Claude Sonnet 4”',
    },
    wrong: [
      { ja: '変わっていない', en: "It didn't change" },
      { ja: '「Claude 4 Sonnet」になった', en: 'It became “Claude 4 Sonnet”' },
      { ja: '「Sonnet Claude 4」になった', en: 'It became “Sonnet Claude 4”' },
    ],
    explanation: {
      ja: 'Claude 4 から「ファミリー名 → 番号」の順になりました。今の公式ドキュメントは、過去のモデルも「Claude Sonnet 3.7」と書き直しています。',
      en: 'From Claude 4, names put the family first and the number second. Today’s official docs also rewrite older models this way, e.g. “Claude Sonnet 3.7”.',
    },
    docs: [N.claude4],
    sources: [N.claude4, D.releaseNotes],
  },
  {
    id: 'U16',
    mode: 'ui',
    question: {
      ja: 'Claude Opus 4.7 と一緒に登場した新機能は？',
      en: 'Which new feature launched together with Claude Opus 4.7?',
    },
    correct: 'Claude Design',
    wrong: ['Claude Code', 'Artifacts', 'Projects'],
    explanation: {
      ja: '2026年4月17日のリリースノートに "With Opus 4.7, we also launched Claude Design" とあります。',
      en: 'The release notes of April 17, 2026 say "With Opus 4.7, we also launched Claude Design".',
    },
    docs: [mp('opus-4-7'), N.opus47],
    sources: [D.claudeAiReleaseNotes],
  },
  {
    id: 'U17',
    mode: 'ui',
    question: {
      ja: 'Opus 4 と Opus 4.1 が claude.ai のモデル選択から外されたのはいつ？',
      en: 'When were Opus 4 and Opus 4.1 removed from the model selector on claude.ai?',
    },
    correct: { ja: '2026年1月', en: 'January 2026' },
    wrong: [
      { ja: '2025年8月', en: 'August 2025' },
      { ja: '2026年6月', en: 'June 2026' },
      { ja: '外されていない', en: "They haven't been removed" },
    ],
    explanation: {
      ja: '2026年1月16日のリリースノートで、モデル選択と Claude Code から外されたと告知されています。',
      en: 'The release notes of January 16, 2026 announced their removal from the model selector and Claude Code.',
    },
    docs: [N.opus41],
    sources: [D.claudeAiReleaseNotes],
  },
  {
    id: 'U18',
    mode: 'ui',
    question: {
      ja: 'Fable 5 と Mythos 5 は、公開の3日後に何があった？',
      en: 'What happened to Fable 5 and Mythos 5 three days after release?',
    },
    correct: { ja: '提供が一時停止された', en: 'Access was paused' },
    wrong: [
      { ja: '値下げされた', en: 'The price dropped' },
      { ja: '名前が変わった', en: 'They were renamed' },
      { ja: 'Opus に統合された', en: 'They were merged into Opus' },
    ],
    explanation: {
      ja: '2026年6月12日に提供停止、7月1日に再開されました。',
      en: 'Access was paused on June 12, 2026 and resumed on July 1.',
    },
    docs: [mp('fable-5'), N.fable5, N.fable5Redeploy],
    sources: [D.claudeAiReleaseNotes],
  },
  {
    id: 'U19',
    mode: 'ui',
    question: {
      ja: 'claude.ai で Thinking をオフにできないモデルは？',
      en: "Which model doesn't let you turn Thinking off on claude.ai?",
    },
    correct: 'Opus 5.5',
    wrong: ['Sonnet 4.6', 'Opus 4.6', 'Opus 4.7'],
    explanation: {
      ja: 'ヘルプセンターに、Opus 5.5・Fable 5.1・Opus 5 は Thinking をオフにできないと書かれています。',
      en: "The Help Center says Thinking can't be turned off for Opus 5.5, Fable 5.1 and Opus 5.",
    },
    docs: [mp('opus-5-5'), D.thinking],
    sources: [D.claudeAiModelSettings],
  },
  {
    id: 'U20',
    mode: 'ui',
    question: {
      ja: 'effort の「Extra high（xhigh）」が使えるのはどのモデルから？',
      en: 'From which model is the “Extra high (xhigh)” effort level available?',
    },
    correct: { ja: 'Opus 4.7 以降', en: 'Opus 4.7 and newer' },
    wrong: [
      { ja: 'Opus 4.5 以降', en: 'Opus 4.5 and newer' },
      { ja: 'Opus 5 以降', en: 'Opus 5 and newer' },
      { ja: 'Sonnet 4.6 以降', en: 'Sonnet 4.6 and newer' },
    ],
    explanation: {
      ja: 'ヘルプセンターに "Available on Opus 4.7 and newer models" とあります。',
      en: 'The Help Center says "Available on Opus 4.7 and newer models".',
    },
    docs: [mp('opus-4-7'), D.effort],
    sources: [D.claudeAiModelSettings],
  },
  {
    id: 'U21',
    mode: 'ui',
    question: {
      ja: 'Opus 5.5 の料金は、Opus 5 と比べてどうなった？',
      en: "How does Opus 5.5's price compare with Opus 5?",
    },
    correct: { ja: '安くなった', en: 'Cheaper' },
    wrong: [
      { ja: '変わらない', en: 'The same' },
      { ja: '高くなった', en: 'More expensive' },
      { ja: '無料になった', en: 'Free' },
    ],
    explanation: {
      ja: '100万トークンあたり、Opus 5 は入力 $5／出力 $25、Opus 5.5 は $4／$20 です。リリースノートでは「Opus 5 より 40% 安く動く」と書かれています。',
      en: 'Per million tokens, Opus 5 costs $5 input / $25 output and Opus 5.5 costs $4 / $20. The release notes describe it as running 40% cheaper than Opus 5.',
    },
    docs: [mp('opus-5-5'), mp('opus-5')],
    sources: [D.pricing, D.claudeAiReleaseNotes],
  },
  {
    id: 'U22',
    mode: 'ui',
    question: {
      ja: 'Opus 4.1 から Opus 4.5 で、API の料金はどうなった？',
      en: 'How did API pricing change from Opus 4.1 to Opus 4.5?',
    },
    correct: { ja: '3分の1になった', en: 'Cut to one third' },
    wrong: [
      { ja: '変わらない', en: 'No change' },
      { ja: '2倍になった', en: 'Doubled' },
      { ja: '半額になった', en: 'Halved' },
    ],
    explanation: {
      ja: '100万トークンあたり、入力 $15／出力 $75 から $5／$25 になりました。',
      en: 'Per million tokens, it went from $15 input / $75 output to $5 / $25.',
    },
    docs: [mp('opus-4-5'), N.opus45],
    sources: [D.pricing],
  },
  {
    id: 'U23',
    mode: 'ui',
    question: {
      ja: 'Fable 5 と Mythos 5 の違いとして、公式に書かれているのは？',
      en: 'Which difference between Fable 5 and Mythos 5 is officially documented?',
    },
    correct: {
      ja: 'Fable には安全分類器があり、Mythos にはない',
      en: "Fable has safety classifiers; Mythos doesn't",
    },
    wrong: [
      { ja: 'Mythos の方が安い', en: 'Mythos is cheaper' },
      { ja: 'Fable は画像を読めない', en: "Fable can't read images" },
      { ja: 'Mythos は日本語に対応していない', en: "Mythos doesn't support Japanese" },
    ],
    explanation: {
      ja: 'Fable 5 にはリクエストを断ることがある安全分類器が入っています。Mythos 5 には入っておらず、Project Glasswing 参加者だけに限定提供されています。',
      en: "Fable 5 includes safety classifiers that may decline requests. Mythos 5 doesn't, and is available only to Project Glasswing participants.",
    },
    docs: [mp('fable-5'), D.fable5Intro, N.glasswing],
    sources: [D.fable5Intro],
  },
  {
    id: 'U24',
    mode: 'ui',
    question: {
      ja: '次のうち、実在しない Opus は？',
      en: 'Which of these Opus models never existed?',
    },
    correct: 'Opus 4.2',
    wrong: ['Opus 4.1', 'Opus 4.8', 'Opus 5'],
    explanation: {
      ja: '4.1 の次の Opus は 4.5 です。4.2〜4.4 はありません。',
      en: 'The Opus after 4.1 is 4.5. There are no versions 4.2 to 4.4.',
    },
    docs: [N.opus41, mp('opus-4-5')],
    sources: [D.pricing, D.deprecations],
  },
  {
    id: 'U25',
    mode: 'ui',
    question: {
      ja: '現行ラインナップで、コンテキストウィンドウが 1M トークンではないモデルは？',
      en: 'In the current lineup, which model does not have a 1M-token context window?',
    },
    correct: 'Haiku 4.5',
    wrong: ['Sonnet 5.5', 'Opus 5.5', 'Fable 5.1'],
    explanation: {
      ja: 'Haiku 4.5 だけ 200K トークンです。',
      en: 'Only Haiku 4.5 has 200K tokens.',
    },
    docs: [mp('haiku-4-5'), D.contextWindows],
    sources: [D.overview],
  },
  {
    id: 'U26',
    mode: 'ui',
    question: {
      ja: '「Claude 5.5 ファミリー」の2番目のモデルは？',
      en: 'Which was the second model of the “Claude 5.5 family”?',
    },
    correct: 'Sonnet 5.5',
    wrong: ['Fable 5.5', 'Haiku 5.5', 'Mythos 5.5'],
    explanation: {
      ja: 'Opus 5.5 が2026年9月22日、Sonnet 5.5 が9月28日です。Sonnet 5.5 の料金は Sonnet 5 と同じ、100万トークンあたり入力 $2／出力 $10 です。',
      en: 'Opus 5.5 came out on September 22, 2026 and Sonnet 5.5 on September 28. Sonnet 5.5 is priced the same as Sonnet 5: $2 input / $10 output per million tokens.',
    },
    docs: [mp('sonnet-5-5'), N.sonnet55, D.whatsNewSonnet55],
    sources: [D.releaseNotes, mp('sonnet-5-5')],
  },
];

const API: Question[] = [
  {
    id: 'A1',
    mode: 'api',
    question: {
      ja: '通称「3.5v2」のモデル ID は？',
      en: 'What is the model ID of the model nicknamed “3.5v2”?',
    },
    correct: 'claude-3-5-sonnet-20241022',
    wrong: ['claude-3-5-sonnet-v2', 'claude-3-6-sonnet-20241022', 'claude-3-5-sonnet-20240620'],
    explanation: {
      ja: 'claude-3-5-sonnet-20240620 は初代 3.5 Sonnet の ID です。',
      en: 'claude-3-5-sonnet-20240620 is the ID of the original 3.5 Sonnet.',
    },
    docs: [N.sonnet35v2],
    sources: [D.deprecations],
  },
  {
    id: 'A2',
    mode: 'api',
    question: {
      ja: 'Claude 3.7 Sonnet のモデル ID は？',
      en: 'What is the model ID of Claude 3.7 Sonnet?',
    },
    correct: 'claude-3-7-sonnet-20250219',
    wrong: ['claude-sonnet-3-7-20250219', 'claude-3.7-sonnet', 'claude-sonnet-3-7'],
    explanation: {
      ja: '「ファミリー名 → 番号」の語順になるのは 4 からです。',
      en: 'IDs switch to the family-then-number order only from 4.',
    },
    docs: [N.sonnet37],
    sources: [D.deprecations],
  },
  {
    id: 'A3',
    mode: 'api',
    question: {
      ja: 'Claude Sonnet 4 のモデル ID は？',
      en: 'What is the model ID of Claude Sonnet 4?',
    },
    correct: 'claude-sonnet-4-20250514',
    wrong: ['claude-4-sonnet-20250514', 'claude-sonnet-4-0', 'claude-4-sonnet'],
    explanation: {
      ja: '4 から claude-{ファミリー名}-{番号} の語順になりました。',
      en: 'From 4, IDs follow the order claude-{family}-{number}.',
    },
    docs: [N.claude4],
    sources: [D.deprecations],
  },
  {
    id: 'A4',
    mode: 'api',
    question: {
      ja: '日付の入らないモデル ID（例：claude-opus-4-6）が使われ始めた世代は？',
      en: 'Which generation started using model IDs without a date (e.g. claude-opus-4-6)?',
    },
    correct: '4.6',
    wrong: ['4', '4.5', '5'],
    explanation: {
      ja: '"Starting with the Claude 4.6 generation, model IDs use a dateless format" と書かれています。',
      en: 'The docs say "Starting with the Claude 4.6 generation, model IDs use a dateless format".',
    },
    docs: [D.whatsNew46, mp('opus-4-6')],
    sources: [D.modelIds],
  },
  {
    id: 'A5',
    mode: 'api',
    question: {
      ja: 'claude-sonnet-4-6 のような日付なし ID の性質は？',
      en: 'What is a dateless ID like claude-sonnet-4-6?',
    },
    correct: { ja: '固定されたスナップショット', en: 'A pinned snapshot' },
    wrong: [
      { ja: '常に最新版を指すエイリアス', en: 'An alias that always points to the latest version' },
      { ja: '毎月更新される', en: 'Updated every month' },
      { ja: 'ベータ版専用', en: 'Beta only' },
    ],
    explanation: {
      ja: '公式ドキュメントで「常に最新を指すポインタだと思うのはよくある誤解」と明記されています。',
      en: 'The official docs state plainly that reading it as a pointer to the latest version is a common misconception.',
    },
    docs: [mp('sonnet-4-6')],
    sources: [D.modelIds],
  },
  {
    id: 'A6',
    mode: 'api',
    question: { ja: 'claude-sonnet-4-5 は何？', en: 'What is claude-sonnet-4-5?' },
    correct: { ja: '日付付き ID を指すエイリアス', en: 'An alias for a dated ID' },
    wrong: [
      { ja: '固定されたスナップショット', en: 'A pinned snapshot' },
      { ja: '4.5 世代のすべてのモデルを指す', en: 'Every model of the 4.5 generation' },
      { ja: '廃止済みの ID', en: 'A retired ID' },
    ],
    explanation: {
      ja: '4.6 より前のモデルでは、日付なしの表記は日付付き ID（claude-sonnet-4-5-20250929）を指すエイリアスです。',
      en: 'For models before 4.6, the dateless form is an alias for a dated ID (claude-sonnet-4-5-20250929).',
    },
    docs: [mp('sonnet-4-5')],
    sources: [D.modelIds, D.overview],
  },
  {
    id: 'A7',
    mode: 'api',
    question: {
      ja: '現行ラインナップ4モデルのうち、モデル ID に日付が入っているのは？',
      en: 'Of the four models in the current lineup, which one has a date in its model ID?',
    },
    correct: 'Haiku 4.5',
    wrong: ['Sonnet 5.5', 'Opus 5.5', 'Fable 5.1'],
    explanation: {
      ja: 'Haiku 4.5 の ID は claude-haiku-4-5-20251001 です。',
      en: "Haiku 4.5's ID is claude-haiku-4-5-20251001.",
    },
    docs: [mp('haiku-4-5')],
    sources: [D.overview],
  },
  {
    id: 'A8',
    mode: 'api',
    question: {
      ja: 'Haiku 4.5 は2025年10月15日公開。モデル ID に入っている日付は？',
      en: 'Haiku 4.5 was released on October 15, 2025. What date is in its model ID?',
    },
    correct: '20251001',
    wrong: ['20251015', '20251022', '20250929'],
    explanation: {
      ja: 'ID の日付と公開日は一致しません。',
      en: "The date in an ID doesn't match the release date.",
    },
    docs: [mp('haiku-4-5'), N.haiku45],
    sources: [mp('haiku-4-5')],
  },
  {
    id: 'A9',
    mode: 'api',
    question: {
      ja: 'Opus 4.5 は2025年11月24日公開。モデル ID に入っている日付は？',
      en: 'Opus 4.5 was released on November 24, 2025. What date is in its model ID?',
    },
    correct: '20251101',
    wrong: ['20251124', '20251120', '20251001'],
    explanation: {
      ja: 'ID は claude-opus-4-5-20251101 です。',
      en: 'The ID is claude-opus-4-5-20251101.',
    },
    docs: [mp('opus-4-5'), N.opus45],
    sources: [mp('opus-4-5')],
  },
  {
    id: 'A10',
    mode: 'api',
    question: {
      ja: 'Google Cloud で日付付きのモデル ID を書くときの区切り文字は？',
      en: 'On Google Cloud, which character separates the date in a dated model ID?',
    },
    correct: '@',
    wrong: ['-', ':', '/'],
    explanation: { ja: '例：claude-haiku-4-5@20251001', en: 'Example: claude-haiku-4-5@20251001' },
    docs: [D.vertex],
    sources: [D.overview, D.modelIds],
  },
  {
    id: 'A11',
    mode: 'api',
    question: {
      ja: 'Amazon Bedrock のモデル ID に付く接頭辞は？',
      en: 'Which prefix do Amazon Bedrock model IDs have?',
    },
    correct: 'anthropic.',
    wrong: ['aws.', 'bedrock/', 'claude:'],
    explanation: { ja: '例：anthropic.claude-opus-5-5', en: 'Example: anthropic.claude-opus-5-5' },
    docs: [D.bedrock],
    sources: [D.overview],
  },
  {
    id: 'A12',
    mode: 'api',
    question: {
      ja: 'Amazon Bedrock（InvokeModel）での Opus 4.5 のモデル ID は？',
      en: "What is Opus 4.5's model ID on Amazon Bedrock (InvokeModel)?",
    },
    correct: 'anthropic.claude-opus-4-5-20251101-v1:0',
    wrong: ['anthropic.claude-opus-4-5', 'claude-opus-4-5@20251101', 'bedrock.claude-opus-4-5-v1'],
    explanation: {
      ja: 'InvokeModel 用の ID には末尾に -v1:0 が付きます。',
      en: 'InvokeModel IDs end with -v1:0.',
    },
    docs: [mp('opus-4-5'), D.bedrockLegacy],
    sources: [mp('opus-4-5')],
  },
  {
    id: 'A13',
    mode: 'api',
    question: {
      ja: 'Amazon Bedrock（InvokeModel）での Opus 4.6 のモデル ID は？',
      en: "What is Opus 4.6's model ID on Amazon Bedrock (InvokeModel)?",
    },
    correct: 'anthropic.claude-opus-4-6-v1',
    wrong: ['anthropic.claude-opus-4-6-v1:0', 'anthropic.claude-opus-4-6', 'claude-opus-4-6@v1'],
    explanation: {
      ja: '同じ 4.6 世代でも、Sonnet 4.6 は anthropic.claude-sonnet-4-6 で -v1 が付きません。',
      en: 'Even within the 4.6 generation, Sonnet 4.6 is anthropic.claude-sonnet-4-6, without -v1.',
    },
    docs: [mp('opus-4-6'), D.bedrockLegacy],
    sources: [mp('opus-4-6'), mp('sonnet-4-6')],
  },
  {
    id: 'A14',
    mode: 'api',
    question: {
      ja: 'モデル ID にドット（.）が入っていたのはどれ？',
      en: 'Which model had a dot (.) in its model ID?',
    },
    correct: 'Claude 2.1',
    wrong: ['Claude 3.5 Sonnet', 'Claude 3.7 Sonnet', 'Claude Opus 4.1'],
    explanation: {
      ja: 'Claude 2.1 の ID は claude-2.1 です。Claude 3 以降はハイフン区切りです。',
      en: "Claude 2.1's ID is claude-2.1. From Claude 3 on, IDs use hyphens.",
    },
    docs: [D.deprecations],
    sources: [D.deprecations],
  },
  {
    id: 'A15',
    mode: 'api',
    question: {
      ja: 'Claude Mythos 5.1 のモデル ID は？',
      en: 'What is the model ID of Claude Mythos 5.1?',
    },
    correct: 'claude-mythos-5-1',
    wrong: ['claude-fable-5-1-mythos', 'claude-mythos-preview', 'claude-5-1-mythos'],
    explanation: {
      ja: 'claude-mythos-preview は別のモデルで、2026年6月9日に非推奨になっています。',
      en: 'claude-mythos-preview is a different model, deprecated on June 9, 2026.',
    },
    docs: [mp('mythos-5-1'), N.glasswing],
    sources: [D.deprecations],
  },
  {
    id: 'A16',
    mode: 'api',
    question: {
      ja: '3.5 Sonnet の2つの ID（20240620 と 20241022）が廃止されたのはいつ？',
      en: 'When were the two 3.5 Sonnet IDs (20240620 and 20241022) retired?',
    },
    correct: { ja: '2つとも2025年10月28日', en: 'Both on October 28, 2025' },
    wrong: [
      { ja: 'それぞれ別の日', en: 'On different days' },
      { ja: '2つとも2026年2月19日', en: 'Both on February 19, 2026' },
      { ja: 'まだ廃止されていない', en: "They haven't been retired" },
    ],
    explanation: {
      ja: '2025年8月13日に告知され、10月28日に2つとも廃止されました。',
      en: 'Announced on August 13, 2025, both were retired on October 28.',
    },
    docs: [N.sonnet35, N.sonnet35v2],
    sources: [D.deprecations],
  },
  {
    id: 'A17',
    mode: 'api',
    question: {
      ja: 'Claude 3 Opus（claude-3-opus-20240229）の後継として推奨されている ID は？',
      en: 'Which ID is the recommended replacement for Claude 3 Opus (claude-3-opus-20240229)?',
    },
    correct: 'claude-opus-4-8',
    wrong: ['claude-opus-5-5', 'claude-opus-4-1-20250805', 'claude-3-5-sonnet-20241022'],
    explanation: {
      ja: '廃止予定ページで、推奨の置き換え先は claude-opus-4-8 になっています。',
      en: 'The deprecations page lists claude-opus-4-8 as the recommended replacement.',
    },
    docs: [mp('opus-4-8'), N.claude3],
    sources: [D.deprecations],
  },
  {
    id: 'A18',
    mode: 'api',
    question: {
      ja: 'Opus 4.7 以降のモデルに temperature を既定値以外で渡すと？',
      en: 'What happens if you pass a non-default temperature to Opus 4.7 or later?',
    },
    correct: { ja: '400 エラーになる', en: 'A 400 error' },
    wrong: [
      { ja: '無視される', en: "It's ignored" },
      { ja: '警告だけ出る', en: 'Only a warning' },
      { ja: 'そのまま効く', en: 'It works as before' },
    ],
    explanation: {
      ja: 'temperature・top_p・top_k は Opus 4.7 以降で非推奨です。',
      en: 'temperature, top_p and top_k are deprecated from Opus 4.7 onward.',
    },
    docs: [mp('opus-4-7'), D.whatsNew47],
    sources: [D.deprecations],
  },
  {
    id: 'A19',
    mode: 'api',
    question: {
      ja: 'Sonnet 5 に thinking: {type: "enabled", budget_tokens: N} を送ると？',
      en: 'What happens if you send thinking: {type: "enabled", budget_tokens: N} to Sonnet 5?',
    },
    correct: { ja: '400 エラーになる', en: 'A 400 error' },
    wrong: [
      { ja: 'そのまま動く', en: 'It works as is' },
      { ja: 'adaptive に変換される', en: "It's converted to adaptive" },
      { ja: '無視される', en: "It's ignored" },
    ],
    explanation: {
      ja: '手動の extended thinking は Sonnet 4.6 で非推奨になり、Sonnet 5 で削除されました。',
      en: 'Manual extended thinking was deprecated in Sonnet 4.6 and removed in Sonnet 5.',
    },
    docs: [mp('sonnet-5'), D.whatsNewSonnet5, D.thinking],
    sources: [D.releaseNotes],
  },
  {
    id: 'A20',
    mode: 'api',
    question: {
      ja: 'API の effort の既定値が medium のモデルは？',
      en: 'Which model defaults to medium effort in the API?',
    },
    correct: 'Opus 5.5',
    wrong: ['Fable 5.1', 'Sonnet 5.5', 'Opus 5'],
    explanation: { ja: 'ほかの3つの既定値は high です。', en: 'The other three default to high.' },
    docs: [mp('opus-5-5'), D.effort],
    sources: [D.overview, mp('opus-5')],
  },
  {
    id: 'A21',
    mode: 'api',
    question: {
      ja: 'トークナイザーが新しくなり、同じ文章のトークン数が約30%増えたのはどのモデルから？',
      en: 'From which model did a new tokenizer raise the token count of the same text by about 30%?',
    },
    correct: 'Opus 4.7',
    wrong: ['Opus 4.5', 'Opus 5', 'Sonnet 4.6'],
    explanation: {
      ja: 'Fable 5 と Mythos 5 も Opus 4.7 と同じトークナイザーを使っています。',
      en: 'Fable 5 and Mythos 5 also use the same tokenizer as Opus 4.7.',
    },
    docs: [mp('opus-4-7'), D.whatsNew47],
    sources: [D.releaseNotes, D.overview],
  },
  {
    id: 'A22',
    mode: 'api',
    question: {
      ja: '現行ラインナップで、最大出力（同期 API）が 64K トークンのモデルは？',
      en: 'In the current lineup, which model has a max output (synchronous API) of 64K tokens?',
    },
    correct: 'Haiku 4.5',
    wrong: ['Sonnet 5.5', 'Opus 5.5', 'Fable 5.1'],
    explanation: { ja: 'ほかの3つは 128K トークンです。', en: 'The other three have 128K tokens.' },
    docs: [mp('haiku-4-5')],
    sources: [D.overview],
  },
  {
    id: 'A23',
    mode: 'api',
    question: {
      ja: 'プロンプトキャッシュの読み出し料金が、基本の入力料金の 2.5% になるモデルは？',
      en: 'For which models do prompt cache reads cost 2.5% of the base input price?',
    },
    correct: { ja: 'Fable 5.1 と Mythos 5.1', en: 'Fable 5.1 and Mythos 5.1' },
    wrong: ['Opus 5.5', 'Haiku 4.5', { ja: '全モデル', en: 'All models' }],
    explanation: {
      ja: '通常は 10%、Opus 5.5 は 5% です。',
      en: "It's normally 10%, and 5% for Opus 5.5.",
    },
    docs: [mp('fable-5-1'), D.promptCaching],
    sources: [D.overview],
  },
  {
    id: 'A24',
    mode: 'api',
    question: {
      ja: 'Sonnet 5 の料金（入力 $2／出力 $10）について、実際に起きたことは？',
      en: "What actually happened to Sonnet 5's price ($2 input / $10 output)?",
    },
    correct: {
      ja: '予定されていた $3／$15 への値上げが取りやめになった',
      en: 'The planned increase to $3 / $15 was cancelled',
    },
    wrong: [
      { ja: '予定どおり値上げされた', en: 'It went up as planned' },
      { ja: '無料になった', en: 'It became free' },
      { ja: 'Batch API 専用になった', en: 'It became Batch API only' },
    ],
    explanation: {
      ja: '2026年8月10日に、導入時の価格がそのまま正式価格になりました。',
      en: 'On August 10, 2026, the launch price became the permanent price.',
    },
    docs: [mp('sonnet-5'), N.sonnet5],
    sources: [D.releaseNotes],
  },
  {
    id: 'A25',
    mode: 'api',
    question: {
      ja: '2026年9月時点で廃止（Retired）になっているモデル ID は？',
      en: 'Which model ID had been retired as of September 2026?',
    },
    correct: 'claude-opus-4-1-20250805',
    wrong: ['claude-opus-4-5-20251101', 'claude-sonnet-4-5-20250929', 'claude-haiku-4-5-20251001'],
    explanation: {
      ja: 'Opus 4.1 は2026年8月5日に廃止されました。ほかの3つはまだ使えます。',
      en: 'Opus 4.1 was retired on August 5, 2026. The other three are still available.',
    },
    docs: [N.opus41],
    sources: [D.deprecations],
  },
  {
    id: 'A26',
    mode: 'api',
    question: {
      ja: 'Sonnet 5.5 に thinking: {type: "disabled"} を送ると？',
      en: 'What happens if you send thinking: {type: "disabled"} to Sonnet 5.5?',
    },
    correct: { ja: '400 エラー', en: 'A 400 error' },
    wrong: [
      { ja: 'そのまま動く', en: 'It works as is' },
      { ja: 'adaptive に変換される', en: "It's converted to adaptive" },
      { ja: '無視される', en: "It's ignored" },
    ],
    explanation: {
      ja: 'Sonnet 5.5 では拒否されます。up-front thinking をオフにするには thinking: {type: "between_tools"} を使います（effort が high 以下のときだけ）。',
      en: 'Sonnet 5.5 rejects it. To turn off up-front thinking, use thinking: {type: "between_tools"} (only when effort is high or lower).',
    },
    docs: [mp('sonnet-5-5'), D.whatsNewSonnet55, D.thinking],
    sources: [mp('sonnet-5-5')],
  },
];

export const QUESTIONS: readonly Question[] = [...UI, ...API];

export function questionsFor(mode: QuizMode): Question[] {
  return QUESTIONS.filter((q) => q.mode === mode);
}
