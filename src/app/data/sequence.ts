import { Link, modelPage as mp, NEWS_LINKS as N } from './links';

export interface SequenceTerm {
  term: string;
  models: string;
  date: string;
  links: Link[];
}

/** The "Anthropic sequence" as listed in the original post, with the models behind each term. */
export const SEQUENCE: readonly SequenceTerm[] = [
  { term: '3', models: 'Claude 3 Haiku / Sonnet / Opus', date: '2024年3月', links: [N.claude3] },
  { term: '3.5', models: 'Claude 3.5 Sonnet', date: '2024年6月', links: [N.sonnet35] },
  {
    term: '3.5v2',
    models: 'Claude 3.5 Sonnet（upgraded）',
    date: '2024年10月',
    links: [N.sonnet35v2],
  },
  { term: '3.7', models: 'Claude 3.7 Sonnet', date: '2025年2月', links: [N.sonnet37] },
  { term: '4', models: 'Claude Opus 4 / Sonnet 4', date: '2025年5月', links: [N.claude4] },
  { term: '4.1', models: 'Claude Opus 4.1', date: '2025年8月', links: [N.opus41] },
  {
    term: '4.5',
    models: 'Claude Sonnet 4.5 / Haiku 4.5 / Opus 4.5',
    date: '2025年9月〜11月',
    links: [mp('sonnet-4-5'), mp('haiku-4-5'), mp('opus-4-5')],
  },
  {
    term: '4.6',
    models: 'Claude Opus 4.6 / Sonnet 4.6',
    date: '2026年2月',
    links: [mp('opus-4-6'), mp('sonnet-4-6')],
  },
  { term: '4.7', models: 'Claude Opus 4.7', date: '2026年4月', links: [mp('opus-4-7')] },
  { term: '4.8', models: 'Claude Opus 4.8', date: '2026年5月', links: [mp('opus-4-8')] },
  {
    term: '5',
    models: 'Claude Fable 5 / Mythos 5 / Sonnet 5 / Opus 5',
    date: '2026年6月〜7月',
    links: [mp('fable-5'), mp('sonnet-5'), mp('opus-5')],
  },
  {
    term: '5.1',
    models: 'Claude Fable 5.1 / Mythos 5.1',
    date: '2026年9月',
    links: [mp('fable-5-1'), mp('mythos-5-1')],
  },
  { term: '5.5', models: 'Claude Opus 5.5', date: '2026年9月', links: [mp('opus-5-5')] },
];
