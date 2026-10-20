import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { I18n, Text } from '../i18n/i18n';
import { APP_NAME } from '../i18n/title';
import { rankFor } from '../quiz/game';
import { MODE_LABELS, QuizStore } from '../quiz/quiz-store';
import { LinkList } from '../shared/link-list';

const APP_URL = 'https://hideokamoto.github.io/anthropic-version-quiz/';

const M = {
  rank: { ja: '称号：', en: 'Title: ' },
  share: { ja: 'X でシェア', en: 'Share on X' },
  retry: { ja: 'もう一度（同じモード）', en: 'Play again (same mode)' },
  modes: { ja: 'モード選択へ', en: 'Choose a mode' },
  review: { ja: 'ふりかえり', en: 'Review' },
  answer: { ja: '正解：', en: 'Answer: ' },
  docs: { ja: 'このバージョンの公式ドキュメント', en: 'Official docs for this version' },
} as const;

@Component({
  selector: 'app-result',
  imports: [RouterLink, LinkList],
  template: `
    @if (store.finished()) {
      <section class="summary">
        <p class="mode">{{ i18n.t(labels[store.mode()!]) }}</p>
        <p class="score">
          {{ store.score() }} <small>/ {{ total() }}</small>
        </p>
        <p class="rank">{{ i18n.t(m.rank) }}{{ i18n.t(rank()) }}</p>
        <div class="actions">
          <a class="primary" [href]="shareUrl()" target="_blank" rel="noopener noreferrer">{{
            i18n.t(m.share)
          }}</a>
          <button type="button" (click)="retry()">{{ i18n.t(m.retry) }}</button>
          <a routerLink="/">{{ i18n.t(m.modes) }}</a>
        </div>
      </section>

      <h2>{{ i18n.t(m.review) }}</h2>
      <ol class="review">
        @for (q of store.questions(); track q.source.id; let i = $index) {
          <li [class.ok]="store.answers()[i] === q.answerIndex">
            <p class="q">{{ i18n.t(q.source.question) }}</p>
            <p>
              {{ i18n.t(m.answer) }}<strong>{{ i18n.t(q.choices[q.answerIndex]) }}</strong>
              @if (store.answers()[i] !== q.answerIndex) {
                <span class="yours">{{ yourAnswer(q.choices[store.answers()[i]!]) }}</span>
              }
            </p>
            <p class="explain">{{ i18n.t(q.source.explanation) }}</p>
            <app-link-list [heading]="i18n.t(m.docs)" [links]="q.source.docs" />
          </li>
        }
      </ol>
    }
  `,
  styles: `
    .summary {
      text-align: center;
      padding: 1.5rem 1rem;
      margin-top: 1rem;
      border-radius: 14px;
      background: var(--surface);
      border: 1px solid var(--border);
    }
    .summary p {
      margin: 0.2rem 0;
    }
    .mode {
      color: var(--muted);
    }
    .score {
      font-size: 3rem;
      font-weight: 800;
      font-family: var(--mono);
    }
    .score small {
      font-size: 1.2rem;
      color: var(--muted);
    }
    .rank {
      font-weight: 700;
      color: var(--accent);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }
    .actions button,
    .actions a:not(.primary) {
      padding: 0.6rem 1rem;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text);
      font: inherit;
      cursor: pointer;
      text-decoration: none;
    }
    h2 {
      margin: 2rem 0 0.75rem;
      font-size: 1.2rem;
    }
    .review {
      padding-left: 1.25rem;
      display: grid;
      gap: 1rem;
    }
    .review li {
      padding-left: 0.25rem;
      border-left: 3px solid var(--ng);
      padding: 0.25rem 0 0.25rem 0.75rem;
    }
    .review li.ok {
      border-left-color: var(--ok);
    }
    .review p {
      margin: 0.2rem 0;
    }
    .q {
      font-weight: 600;
    }
    .yours {
      color: var(--ng);
    }
    .explain {
      color: var(--muted);
      font-size: 0.9rem;
    }
    app-link-list {
      display: block;
      margin-top: 0.4rem;
    }
  `,
})
export class ResultPage implements OnInit {
  protected readonly i18n = inject(I18n);
  protected readonly store = inject(QuizStore);
  private readonly router = inject(Router);

  protected readonly m = M;
  protected readonly labels = MODE_LABELS;
  protected readonly total = computed(() => this.store.questions().length);
  protected readonly rank = computed(() => rankFor(this.store.score(), this.total()));
  protected readonly shareUrl = computed(() => {
    const mode = this.store.mode();
    const lang = this.i18n.lang();
    const name = this.i18n.t(APP_NAME);
    const label = mode ? this.i18n.t(MODE_LABELS[mode]) : '';
    const score = `${this.store.score()}/${this.total()}`;
    const rank = this.i18n.t(this.rank());
    const text =
      lang === 'ja'
        ? `${name}（${label}）で ${score} 問正解！称号「${rank}」 #Anthropic数列`
        : `I scored ${score} on the ${name} (${label})! Title: “${rank}” #Anthropic数列`;
    // 英語で遊んだ人のシェアは、開いた人にも英語で見せる
    const url = lang === 'ja' ? APP_URL : `${APP_URL}?lang=${lang}`;
    const params = new URLSearchParams({ text, url });
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  });

  ngOnInit(): void {
    if (!this.store.finished()) void this.router.navigate(['/']);
  }

  protected yourAnswer(choice: Text): string {
    const a = this.i18n.t(choice);
    return this.i18n.lang() === 'ja' ? `（あなたの回答：${a}）` : ` (your answer: ${a})`;
  }

  protected retry(): void {
    const mode = this.store.mode();
    if (!mode) return;
    this.store.start(mode);
    void this.router.navigate(['/quiz']);
  }
}
