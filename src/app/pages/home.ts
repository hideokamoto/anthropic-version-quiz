import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QuizMode } from '../data/questions';
import { SEQUENCE } from '../data/sequence';
import { QUESTIONS_PER_GAME } from '../quiz/game';
import { MODE_LABELS, QuizStore } from '../quiz/quiz-store';

interface ModeCard {
  mode: QuizMode;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <p class="eyebrow">Anthropic数列カルトクイズ</p>
      <h1>次の項は、いくつ？</h1>
      <ol class="sequence" aria-label="Anthropic数列">
        @for (item of sequence; track item.term; let i = $index) {
          <li [style.animation-delay.ms]="i * 90">{{ item.term }}</li>
        }
        <li class="next" [style.animation-delay.ms]="sequence.length * 90">?</li>
      </ol>
      <p class="lead">
        Claude のバージョン番号はまっすぐ進みません。公式ドキュメントで確かめた事実だけで作った
        {{ perGame }} 問のクイズで、どこまで追えているか試してください。
      </p>
    </section>

    <section class="modes">
      @for (card of cards; track card.mode) {
        <button type="button" class="mode" (click)="start(card.mode)">
          <span class="mode-name">{{ labels[card.mode] }}</span>
          <span class="mode-desc">{{ card.description }}</span>
          @let b = best(card.mode);
          @if (b !== null) {
            <span class="best">自己ベスト {{ b }} / {{ perGame }}</span>
          }
        </button>
      }
    </section>

    <p class="about-link"><a routerLink="/about">数列の中身・クレジット・参考資料</a></p>
  `,
  styles: `
    .hero {
      text-align: center;
      padding: 1.5rem 0 1rem;
    }
    .eyebrow {
      margin: 0;
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    h1 {
      margin: 0.25rem 0 1rem;
      font-size: clamp(1.8rem, 6vw, 2.6rem);
    }
    .sequence {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.4rem;
      list-style: none;
      padding: 0;
      margin: 0 0 1.25rem;
    }
    .sequence li {
      font-family: var(--mono);
      padding: 0.3rem 0.6rem;
      border-radius: 999px;
      background: var(--surface);
      border: 1px solid var(--border);
      opacity: 0;
      animation: pop 0.3s ease-out forwards;
    }
    .sequence li.next {
      background: var(--accent);
      color: var(--on-accent);
      border-color: var(--accent);
      font-weight: 700;
    }
    @keyframes pop {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .sequence li {
        animation: none;
        opacity: 1;
      }
    }
    .lead {
      color: var(--muted);
      max-width: 36rem;
      margin: 0 auto;
    }
    .modes {
      display: grid;
      gap: 0.75rem;
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
      margin: 1.5rem 0;
    }
    .mode {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      text-align: left;
      padding: 1rem 1.1rem;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font: inherit;
      cursor: pointer;
    }
    .mode:hover,
    .mode:focus-visible {
      border-color: var(--accent);
    }
    .mode-name {
      font-weight: 700;
      font-size: 1.1rem;
    }
    .mode-desc {
      color: var(--muted);
      font-size: 0.9rem;
    }
    .best {
      font-size: 0.8rem;
      color: var(--accent);
    }
    .about-link {
      text-align: center;
    }
  `,
})
export class HomePage {
  private readonly store = inject(QuizStore);
  private readonly router = inject(Router);

  protected readonly sequence = SEQUENCE;
  protected readonly labels = MODE_LABELS;
  protected readonly perGame = QUESTIONS_PER_GAME;
  protected readonly cards: ModeCard[] = [
    { mode: 'ui', description: 'モデルの表示名・公開順・claude.ai での挙動' },
    { mode: 'api', description: 'モデル ID・命名規則・Bedrock / Google Cloud の ID' },
  ];

  protected best(mode: QuizMode): number | null {
    return this.store.best(mode);
  }

  protected start(mode: QuizMode): void {
    this.store.start(mode);
    void this.router.navigate(['/quiz']);
  }
}
