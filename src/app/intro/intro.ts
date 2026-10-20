import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n, Text } from '../i18n/i18n';
import { QUESTIONS_PER_GAME } from '../quiz/game';

interface Faq {
  q: Text;
  a: Text;
}

interface Step {
  title: Text;
  body: Text;
}

const M = {
  eyebrow: { ja: 'このクイズについて', en: 'About this quiz' },
  play: { ja: 'クイズで遊ぶ', en: 'Play the quiz' },
  video: {
    ja: 'プレイ動画。4択に答え、公式ドキュメントのリンクで答え合わせをして、称号つきの結果を出す',
    en: 'Gameplay video (Japanese UI): answering four-choice questions, checking them against official doc links, and getting a result with a title',
  },
  how: { ja: '遊び方', en: 'How to play' },
  faq: { ja: 'よくある質問', en: 'FAQ' },
  more: {
    ja: '数列の中身・クレジット・参考資料',
    en: 'The sequence, credits and references',
  },
} as const;

@Component({
  selector: 'app-intro',
  imports: [RouterLink],
  template: `
    <section class="lead">
      <p class="eyebrow">{{ i18n.t(m.eyebrow) }}</p>
      @if (i18n.lang() === 'ja') {
        <h2>Claude のバージョン番号、<br />どこまで追えてる？</h2>
        <!-- 日本語の文中で改行すると空白として描画されるので、1文ずつ要素を分けて改行する -->
        <p>
          <span>Claude のバージョン番号はまっすぐ進みません。</span
          ><span>その「Anthropic数列」を題材に、公式ドキュメントで確かめた事実だけで作った</span
          ><span>{{ perGame }}問の4択クイズです。</span
          ><span>登録なし・ブラウザだけで遊べます。</span>
        </p>
      } @else {
        <h2>How well do you know<br />Claude's version numbers?</h2>
        <p>
          Claude's version numbers don't go up in a straight line. This is a
          {{ perGame }}-question multiple-choice quiz about that “Anthropic Sequence”, built only
          from facts checked against the official docs. No sign-up — it runs in your browser.
        </p>
      }
      <button type="button" class="primary play" (click)="play.emit()">
        {{ i18n.t(m.play) }}
      </button>
    </section>

    <figure class="movie">
      <!-- 動画は日本語版の画面を撮ったもの -->
      <video
        src="lp/promo.mp4"
        poster="lp/promo-poster.webp"
        muted
        loop
        playsinline
        controls
        preload="none"
        [attr.aria-label]="i18n.t(m.video)"
      ></video>
    </figure>

    <section class="how">
      <h3>{{ i18n.t(m.how) }}</h3>
      <ol class="steps">
        @for (step of steps; track $index) {
          <li>
            <b>{{ i18n.t(step.title) }}</b
            >{{ i18n.t(step.body) }}
          </li>
        }
      </ol>
    </section>

    <section class="faq-sec">
      <h3>{{ i18n.t(m.faq) }}</h3>
      <div class="faq">
        @for (f of faqs; track $index) {
          <details>
            <summary>{{ i18n.t(f.q) }}</summary>
            <p>{{ i18n.t(f.a) }}</p>
          </details>
        }
      </div>
    </section>

    <p class="links">
      <a routerLink="/about">{{ i18n.t(m.more) }}</a>
    </p>
  `,
  styles: `
    :host {
      display: grid;
      gap: 1.25rem;
    }
    section {
      display: grid;
      gap: 0.5rem;
    }
    .lead p {
      margin: 0;
      color: var(--muted);
    }
    .lead .eyebrow {
      color: var(--accent);
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
    }
    h2 {
      margin: 0;
      font-size: 1.35rem;
      line-height: 1.4;
    }
    h3 {
      margin: 0;
      font-size: 1rem;
    }
    .play {
      margin-top: 0.25rem;
    }
    .movie {
      margin: 0;
    }
    .movie video {
      display: block;
      width: min(240px, 70%);
      margin: 0 auto;
      aspect-ratio: 9 / 16;
      border-radius: 14px;
      background: #1c1b19;
    }
    .steps {
      margin: 0;
      padding-left: 1.4rem;
      display: grid;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--muted);
    }
    .steps b {
      display: block;
      color: var(--text);
    }
    .faq {
      display: grid;
      gap: 0.4rem;
    }
    details {
      border: 1px solid var(--border);
      border-radius: 10px;
      background: var(--surface);
      padding: 0.5rem 0.8rem;
      font-size: 0.9rem;
    }
    summary {
      cursor: pointer;
      font-weight: 600;
    }
    details p {
      margin: 0.4rem 0 0;
      color: var(--muted);
    }
    .links {
      margin: 0;
      font-size: 0.9rem;
    }
    /* タブレット・PC: クイズが隣に見えているのでボタンは出さず、縦に長い動画は後ろへ回す */
    @media (min-width: 768px) {
      .play {
        display: none;
      }
      .how {
        order: 1;
      }
      .faq-sec {
        order: 2;
      }
      .movie {
        order: 3;
      }
      .links {
        order: 4;
      }
      .movie video {
        width: 200px;
      }
    }
  `,
})
export class Intro {
  /** SP でクイズのタブへ戻るための通知 */
  readonly play = output<void>();

  protected readonly i18n = inject(I18n);
  protected readonly m = M;
  protected readonly perGame = QUESTIONS_PER_GAME;
  protected readonly steps: Step[] = [
    {
      title: { ja: 'モードを選ぶ', en: 'Pick a mode' },
      body: { ja: 'claude.ai モードと API モードの2種類', en: 'claude.ai mode or API mode' },
    },
    {
      title: { ja: '4択に答える', en: 'Answer four-choice questions' },
      body: {
        ja: `1プレイ ${QUESTIONS_PER_GAME} 問。出題は毎回ランダム`,
        en: `${QUESTIONS_PER_GAME} questions per game, picked at random each time`,
      },
    },
    {
      title: { ja: '根拠を確かめる', en: 'Check the evidence' },
      body: {
        ja: '答えるたびに、公式ドキュメントと根拠のページへのリンクが出る',
        en: 'After each answer you get links to the official docs and the pages behind the answer',
      },
    },
    {
      title: { ja: '称号をシェア', en: 'Share your title' },
      body: {
        ja: '正解数に応じた称号つきで X に投稿できる',
        en: 'Post your score on X with a title based on how many you got right',
      },
    },
  ];
  protected readonly faqs: Faq[] = [
    {
      q: { ja: '無料ですか？', en: 'Is it free?' },
      a: {
        ja: '無料です。登録やインストールも要りません。',
        en: 'Yes. No sign-up or install needed.',
      },
    },
    {
      q: { ja: '正解は何を根拠にしていますか？', en: 'Where do the answers come from?' },
      a: {
        ja: 'Anthropic の公式ドキュメント・リリースノート・発表記事です。解答後に根拠のページへのリンクを出しています。',
        en: "Anthropic's official docs, release notes and announcements. After each answer, the quiz links to the pages it is based on.",
      },
    },
    {
      q: { ja: 'Anthropic の公式クイズですか？', en: 'Is this an official Anthropic quiz?' },
      a: {
        ja: 'いいえ。Anthropic とは関係のない、非公式のファンメイドです。',
        en: 'No. It is an unofficial fan-made quiz, not affiliated with Anthropic.',
      },
    },
  ];
}
