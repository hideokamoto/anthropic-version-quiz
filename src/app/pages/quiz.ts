import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MODE_LABELS, QuizStore } from '../quiz/quiz-store';
import { LinkList } from '../shared/link-list';

@Component({
  selector: 'app-quiz',
  imports: [LinkList],
  template: `
    @if (store.current(); as q) {
      <p class="progress">
        {{ labels[store.mode()!] }} ・ {{ store.index() + 1 }} / {{ store.questions().length }}
      </p>
      <h2>{{ q.source.question }}</h2>

      <div class="choices" role="group" aria-label="選択肢">
        @for (choice of q.choices; track choice; let i = $index) {
          <button
            type="button"
            class="choice"
            [class.correct]="answered() && i === q.answerIndex"
            [class.wrong]="answered() && i === store.currentAnswer() && i !== q.answerIndex"
            [disabled]="answered()"
            (click)="store.answer(i)"
          >
            <span class="letter">{{ letters[i] }}</span>
            <span>{{ choice }}</span>
          </button>
        }
      </div>

      @if (answered()) {
        <section class="feedback" aria-live="polite">
          <p class="verdict" [class.ok]="isCorrect()">
            {{ isCorrect() ? '正解！' : '不正解… 正解は「' + q.choices[q.answerIndex] + '」' }}
          </p>
          <p>{{ q.source.explanation }}</p>
          <app-link-list heading="このバージョンの公式ドキュメント" [links]="q.source.docs" />
          <app-link-list heading="答えの根拠" [links]="q.source.sources" />
          <button type="button" class="primary" (click)="next()">
            {{ isLast() ? '結果を見る' : '次の問題へ' }}
          </button>
        </section>
      }
    }
  `,
  styles: `
    .progress {
      color: var(--muted);
      font-size: 0.9rem;
      margin: 1rem 0 0.25rem;
    }
    h2 {
      font-size: 1.3rem;
      margin: 0 0 1rem;
      line-height: 1.5;
    }
    .choices {
      display: grid;
      gap: 0.5rem;
    }
    .choice {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
      text-align: left;
      padding: 0.8rem 1rem;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font: inherit;
      cursor: pointer;
      overflow-wrap: anywhere;
    }
    .choice:not(:disabled):hover,
    .choice:focus-visible {
      border-color: var(--accent);
    }
    .choice:disabled {
      cursor: default;
    }
    .choice.correct {
      border-color: var(--ok);
      background: var(--ok-bg);
    }
    .choice.wrong {
      border-color: var(--ng);
      background: var(--ng-bg);
    }
    .letter {
      font-family: var(--mono);
      font-weight: 700;
      color: var(--muted);
    }
    .feedback {
      margin-top: 1.25rem;
      padding: 1rem 1.1rem;
      border-radius: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
      display: grid;
      gap: 0.75rem;
    }
    .feedback p {
      margin: 0;
    }
    .verdict {
      font-weight: 700;
      color: var(--ng);
    }
    .verdict.ok {
      color: var(--ok);
    }
  `,
})
export class QuizPage implements OnInit {
  protected readonly store = inject(QuizStore);
  private readonly router = inject(Router);

  protected readonly labels = MODE_LABELS;
  protected readonly letters = ['A', 'B', 'C', 'D'];

  ngOnInit(): void {
    if (!this.store.current()) void this.router.navigate(['/']);
  }

  protected answered(): boolean {
    return this.store.currentAnswer() !== null;
  }

  protected isCorrect(): boolean {
    return this.store.currentAnswer() === this.store.current()?.answerIndex;
  }

  protected isLast(): boolean {
    return this.store.index() === this.store.questions().length - 1;
  }

  protected next(): void {
    if (!this.store.next()) void this.router.navigate(['/result']);
    else window.scrollTo({ top: 0 });
  }
}
