import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QUESTIONS_PER_GAME } from '../quiz/game';

interface Faq {
  q: string;
  a: string;
}

@Component({
  selector: 'app-intro',
  imports: [RouterLink],
  template: `
    <section class="lead">
      <p class="eyebrow">このクイズについて</p>
      <h2>Claude のバージョン番号、<br />どこまで追えてる？</h2>
      <p>
        3, 3.5, 3.5v2, 3.7, 4, 4.1 … まっすぐ進まない「Anthropic数列」を題材にした
        {{ perGame }} 問の4択クイズです。登録なし・ブラウザだけで遊べます。
      </p>
      <button type="button" class="primary play" (click)="play.emit()">クイズで遊ぶ</button>
    </section>

    <figure class="movie">
      <video
        src="lp/promo.mp4"
        poster="lp/promo-poster.webp"
        muted
        loop
        playsinline
        controls
        preload="none"
        aria-label="プレイ動画。4択に答え、公式ドキュメントのリンクで答え合わせをして、称号つきの結果を出す"
      ></video>
    </figure>

    <section>
      <h3>遊び方</h3>
      <ol class="steps">
        <li><b>モードを選ぶ</b>claude.ai モード（表示名・公開順）か API モード（モデル ID）</li>
        <li><b>4択に答える</b>1プレイ {{ perGame }} 問。出題は毎回ランダム</li>
        <li><b>根拠を確かめる</b>答えるたびに、公式ドキュメントと根拠のページへのリンクが出る</li>
        <li><b>称号をシェア</b>正解数に応じた称号つきで X に投稿できる</li>
      </ol>
    </section>

    <section>
      <h3>よくある質問</h3>
      <div class="faq">
        @for (f of faqs; track f.q) {
          <details>
            <summary>{{ f.q }}</summary>
            <p>{{ f.a }}</p>
          </details>
        }
      </div>
    </section>

    <p class="links">
      <a routerLink="/about">数列の中身・クレジット・参考資料</a>
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
    /* タブレット・PC ではクイズが隣に見えているので出さない */
    @media (min-width: 768px) {
      .play {
        display: none;
      }
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
  `,
})
export class Intro {
  /** SP でクイズのタブへ戻るための通知 */
  readonly play = output<void>();

  protected readonly perGame = QUESTIONS_PER_GAME;
  protected readonly faqs: Faq[] = [
    { q: '無料ですか？', a: '無料です。登録やインストールも要りません。' },
    {
      q: '正解は何を根拠にしていますか？',
      a: 'Anthropic の公式ドキュメント・リリースノート・発表記事です。解答後に根拠のページへのリンクを出しています。',
    },
    {
      q: 'Anthropic の公式クイズですか？',
      a: 'いいえ。Anthropic とは関係のない、非公式のファンメイドです。',
    },
  ];
}
