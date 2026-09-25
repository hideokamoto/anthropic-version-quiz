export interface Link {
  label: string;
  url: string;
}

const DOCS = 'https://platform.claude.com/docs/en';
const NEWS = 'https://www.anthropic.com/news';
const SUPPORT = 'https://support.claude.com/en/articles';

/** Model pages confirmed to exist on platform.claude.com (2026-09-25). */
type ModelSlug =
  | 'fable-5-1'
  | 'mythos-5-1'
  | 'fable-5'
  | 'opus-5-5'
  | 'opus-5'
  | 'opus-4-8'
  | 'opus-4-7'
  | 'opus-4-6'
  | 'opus-4-5'
  | 'sonnet-5'
  | 'sonnet-4-6'
  | 'sonnet-4-5'
  | 'haiku-4-5';

const MODEL_NAMES: Record<ModelSlug, string> = {
  'fable-5-1': 'Claude Fable 5.1',
  'mythos-5-1': 'Claude Mythos 5.1',
  'fable-5': 'Claude Fable 5',
  'opus-5-5': 'Claude Opus 5.5',
  'opus-5': 'Claude Opus 5',
  'opus-4-8': 'Claude Opus 4.8',
  'opus-4-7': 'Claude Opus 4.7',
  'opus-4-6': 'Claude Opus 4.6',
  'opus-4-5': 'Claude Opus 4.5',
  'sonnet-5': 'Claude Sonnet 5',
  'sonnet-4-6': 'Claude Sonnet 4.6',
  'sonnet-4-5': 'Claude Sonnet 4.5',
  'haiku-4-5': 'Claude Haiku 4.5',
};

export function modelPage(slug: ModelSlug): Link {
  return { label: `${MODEL_NAMES[slug]} モデルページ`, url: `${DOCS}/models/${slug}/overview` };
}

/** Announcement posts on anthropic.com. */
export const NEWS_LINKS = {
  claude3: {
    label: 'Introducing the next generation of Claude（Claude 3 発表）',
    url: `${NEWS}/claude-3-family`,
  },
  sonnet35: { label: 'Introducing Claude 3.5 Sonnet', url: `${NEWS}/claude-3-5-sonnet` },
  sonnet35v2: {
    label: 'Introducing computer use, a new Claude 3.5 Sonnet, and Claude 3.5 Haiku',
    url: `${NEWS}/3-5-models-and-computer-use`,
  },
  sonnet37: { label: 'Claude 3.7 Sonnet and Claude Code', url: `${NEWS}/claude-3-7-sonnet` },
  claude4: { label: 'Introducing Claude 4', url: `${NEWS}/claude-4` },
  opus41: { label: 'Claude Opus 4.1', url: `${NEWS}/claude-opus-4-1` },
  sonnet45: { label: 'Introducing Claude Sonnet 4.5', url: `${NEWS}/claude-sonnet-4-5` },
  haiku45: { label: 'Introducing Claude Haiku 4.5', url: `${NEWS}/claude-haiku-4-5` },
  opus45: { label: 'Introducing Claude Opus 4.5', url: `${NEWS}/claude-opus-4-5` },
  opus46: { label: 'Introducing Claude Opus 4.6', url: `${NEWS}/claude-opus-4-6` },
  sonnet46: { label: 'Introducing Claude Sonnet 4.6', url: `${NEWS}/claude-sonnet-4-6` },
  opus47: { label: 'Introducing Claude Opus 4.7', url: `${NEWS}/claude-opus-4-7` },
  opus48: { label: 'Introducing Claude Opus 4.8', url: `${NEWS}/claude-opus-4-8` },
  fable5: { label: 'Claude Fable 5 and Claude Mythos 5', url: `${NEWS}/claude-fable-5-mythos-5` },
  fable5Redeploy: { label: 'Redeploying Claude Fable 5', url: `${NEWS}/redeploying-fable-5` },
  sonnet5: { label: 'Introducing Claude Sonnet 5', url: `${NEWS}/claude-sonnet-5` },
  opus5: { label: 'Claude Opus 5', url: `${NEWS}/claude-opus-5` },
  fable51: {
    label: 'Claude Fable 5.1 and Mythos 5.1',
    url: 'https://www.anthropic.com/claude-fable-and-mythos-5-1',
  },
  opus55: {
    label: 'Introducing Claude Opus 5.5',
    url: 'https://www.anthropic.com/claude-opus-5-5',
  },
  glasswing: { label: 'Project Glasswing', url: 'https://www.anthropic.com/glasswing' },
} satisfies Record<string, Link>;

/** Reference pages used as evidence for answers. */
export const DOC_LINKS = {
  overview: { label: 'Models overview', url: `${DOCS}/about-claude/models/overview` },
  deprecations: { label: 'Model deprecations', url: `${DOCS}/about-claude/model-deprecations` },
  modelIds: {
    label: 'Model IDs and versioning',
    url: `${DOCS}/about-claude/models/model-ids-and-versions`,
  },
  releaseNotes: { label: 'Claude Platform リリースノート', url: `${DOCS}/release-notes/overview` },
  pricing: { label: 'Pricing', url: `${DOCS}/about-claude/pricing` },
  fable5Intro: {
    label: 'Introducing Claude Fable 5 and Claude Mythos 5（ドキュメント）',
    url: `${DOCS}/models/fable-5/introducing-claude-fable-5-and-claude-mythos-5`,
  },
  whatsNew46: {
    label: "What's new in Claude 4.6",
    url: `${DOCS}/about-claude/models/whats-new-claude-4-6`,
  },
  whatsNew47: {
    label: "What's new in Claude Opus 4.7",
    url: `${DOCS}/about-claude/models/whats-new-claude-4-7`,
  },
  whatsNewSonnet5: {
    label: "What's new in Claude Sonnet 5",
    url: `${DOCS}/models/sonnet-5/whats-new-sonnet-5`,
  },
  whatsNewOpus55: {
    label: "What's new in Claude Opus 5.5",
    url: `${DOCS}/models/opus-5-5/whats-new-opus-5-5`,
  },
  bedrock: {
    label: 'Claude in Amazon Bedrock',
    url: `${DOCS}/build-with-claude/claude-in-amazon-bedrock`,
  },
  bedrockLegacy: {
    label: 'Claude on Amazon Bedrock (Opus 4.6 and earlier)',
    url: `${DOCS}/build-with-claude/claude-on-amazon-bedrock-legacy`,
  },
  vertex: { label: 'Claude on Google Cloud', url: `${DOCS}/build-with-claude/claude-on-vertex-ai` },
  thinking: { label: 'Thinking', url: `${DOCS}/build-with-claude/thinking` },
  effort: { label: 'Effort', url: `${DOCS}/build-with-claude/effort` },
  promptCaching: { label: 'Prompt caching', url: `${DOCS}/build-with-claude/prompt-caching` },
  contextWindows: { label: 'Context windows', url: `${DOCS}/build-with-claude/context-windows` },
  claudeAiReleaseNotes: {
    label: 'Claude ヘルプセンター：Release notes',
    url: `${SUPPORT}/12138966-release-notes`,
  },
  claudeAiModelSettings: {
    label: 'Claude ヘルプセンター：Change the model, effort, and thinking settings',
    url: `${SUPPORT}/8664678-change-the-model-effort-and-thinking-settings`,
  },
} satisfies Record<string, Link>;

export const CREDIT_LINKS = {
  watany: { label: '@_watany（X アカウント）', url: 'https://x.com/_watany' },
  watanyPost: {
    label: '「Anthropic数列」の投稿',
    url: 'https://x.com/_watany/status/2102653393500299316',
  },
  repo: {
    label: 'GitHub リポジトリ',
    url: 'https://github.com/hideokamoto/anthropic-version-quiz',
  },
} satisfies Record<string, Link>;

export const LICENSE_LINKS = {
  appLicense: {
    label: 'LICENSE（GitHub）',
    url: 'https://github.com/hideokamoto/anthropic-version-quiz/blob/main/LICENSE',
  },
  gpl3: {
    label: 'GNU General Public License v3.0（gnu.org）',
    url: 'https://www.gnu.org/licenses/gpl-3.0.html',
  },
} satisfies Record<string, Link>;
