import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { rankFor } from '../quiz/game';
import { MODE_LABELS, QuizStore } from '../quiz/quiz-store';
import { LinkList } from '../shared/link-list';

const APP_URL = 'https://hideokamoto.github.io/anthropic-version-quiz/';

@Component({
  selector: 'app-result',
  imports: [RouterLink, LinkList],
  template: `
    @if (store.finished()) {
      <section class="summary">
        <p class="mode">{{ labels[store.mode()!] }}</p>
        <p class="score">
          {{ store.score() }} <small>/ {{ total() }}</small>
        </p>
        <p class="rank">称号：{{ rank() }}</p>
        <div class="actions">
          <a class="primary" [href]="shareUrl()" target="_blank" rel="noopener noreferrer"
            >X でシェア</a
          >
          <button type="button" (click)="retry()">もう一度（同じモード）</button>
          <a routerLink="/">モード選択へ</a>
        </div>
      </section>

      <h2>ふりかえり</h2>
      <ol class="review">
        @for (q of store.questions(); track q.source.id; let i = $index) {
          <li [class.ok]="store.answers()[i] === q.answerIndex">
            <p class="q">{{ q.source.question }}</p>
            <p>
              正解：<strong>{{ q.choices[q.answerIndex] }}</strong>
              @if (store.answers()[i] !== q.answerIndex) {
                <span class="yours">（あなたの回答：{{ q.choices[store.answers()[i]!] }}）</span>
              }
            </p>
            <p class="explain">{{ q.source.explanation }}</p>
            <app-link-list heading="このバージョンの公式ドキュメント" [links]="q.source.docs" />
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
  protected readonly store = inject(QuizStore);
  private readonly router = inject(Router);

  protected readonly labels = MODE_LABELS;
  protected readonly total = computed(() => this.store.questions().length);
  protected readonly rank = computed(() => rankFor(this.store.score(), this.total()));
  protected readonly shareUrl = computed(() => {
    const mode = this.store.mode();
    const text =
      `Anthropic数列クイズ（${mode ? MODE_LABELS[mode] : ''}）で ` +
      `${this.store.score()}/${this.total()} 問正解！称号「${this.rank()}」 #Anthropic数列`;
    const params = new URLSearchParams({ text, url: APP_URL });
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  });

  ngOnInit(): void {
    if (!this.store.finished()) void this.router.navigate(['/']);
  }

  protected retry(): void {
    const mode = this.store.mode();
    if (!mode) return;
    this.store.start(mode);
    void this.router.navigate(['/quiz']);
  }
}
