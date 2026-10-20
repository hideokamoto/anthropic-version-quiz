import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizMode } from '../data/questions';
import { I18n, Text } from '../i18n/i18n';
import { SEQUENCE } from '../data/sequence';
import { QUESTIONS_PER_GAME } from '../quiz/game';
import { MODE_LABELS, QuizStore } from '../quiz/quiz-store';

interface ModeCard {
  mode: QuizMode;
  description: Text;
}

const M = {
  eyebrow: { ja: 'Anthropic数列カルトクイズ', en: 'Anthropic Sequence trivia' },
  heading: { ja: '次の項は、いくつ？', en: 'What comes next?' },
  sequence: { ja: 'Anthropic数列', en: 'The Anthropic Sequence' },
  best: { ja: '自己ベスト', en: 'Best' },
} as const;

@Component({
  selector: 'app-home',
  template: `
    <section class="hero">
      <p class="eyebrow">{{ i18n.t(m.eyebrow) }}</p>
      <h1>{{ i18n.t(m.heading) }}</h1>
      <ol class="sequence" [attr.aria-label]="i18n.t(m.sequence)">
        @for (item of sequence; track item.term; let i = $index) {
          <li [style.animation-delay.ms]="i * 90">{{ item.term }}</li>
        }
        <li class="next" [style.animation-delay.ms]="sequence.length * 90">?</li>
      </ol>
    </section>

    <section class="modes">
      @for (card of cards; track card.mode) {
        <button type="button" class="mode" (click)="start(card.mode)">
          <span class="mode-name">{{ i18n.t(labels[card.mode]) }}</span>
          <span class="mode-desc">{{ i18n.t(card.description) }}</span>
          @let b = best(card.mode);
          @if (b !== null) {
            <span class="best">{{ i18n.t(m.best) }} {{ b }} / {{ perGame }}</span>
          }
        </button>
      }
    </section>
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
  `,
})
export class HomePage {
  protected readonly i18n = inject(I18n);
  private readonly store = inject(QuizStore);
  private readonly router = inject(Router);

  protected readonly m = M;
  protected readonly sequence = SEQUENCE;
  protected readonly labels = MODE_LABELS;
  protected readonly perGame = QUESTIONS_PER_GAME;
  protected readonly cards: ModeCard[] = [
    {
      mode: 'ui',
      description: {
        ja: 'モデルの表示名・公開順・claude.ai での挙動',
        en: 'Model names, release order and behavior on claude.ai',
      },
    },
    {
      mode: 'api',
      description: {
        ja: 'モデル ID・命名規則・Bedrock / Google Cloud の ID',
        en: 'Model IDs, naming rules and Bedrock / Google Cloud IDs',
      },
    },
  ];

  protected best(mode: QuizMode): number | null {
    return this.store.best(mode);
  }

  protected start(mode: QuizMode): void {
    this.store.start(mode);
    void this.router.navigate(['/quiz']);
  }
}
