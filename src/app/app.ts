import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { I18n } from './i18n/i18n';
import { APP_NAME } from './i18n/title';
import { Intro } from './intro/intro';

type Tab = 'app' | 'intro';

const M = {
  credits: { ja: 'クレジット', en: 'Credits' },
  licenses: { ja: 'ライセンス', en: 'Licenses' },
  tabs: { ja: '表示の切り替え', en: 'Switch view' },
  quiz: { ja: 'クイズ', en: 'Quiz' },
  about: { ja: 'このクイズについて', en: 'About this quiz' },
  footer: {
    ja: '非公式のファンメイドクイズです。Anthropic とは関係ありません。',
    en: 'An unofficial fan-made quiz. Not affiliated with Anthropic.',
  },
} as const;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Intro],
  template: `
    <header class="site-header">
      <a routerLink="/" class="brand">{{ i18n.t(appName) }}</a>
      <nav>
        <a routerLink="/about">{{ i18n.t(m.credits) }}</a>
        <a routerLink="/licenses">{{ i18n.t(m.licenses) }}</a>
        <!-- 切り替え先の言語名を、その言語で書く -->
        @if (i18n.lang() === 'ja') {
          <button type="button" class="lang" lang="en" (click)="i18n.set('en')">English</button>
        } @else {
          <button type="button" class="lang" lang="ja" (click)="i18n.set('ja')">日本語</button>
        }
      </nav>
    </header>

    @if (!wide()) {
      <div class="tabs" role="tablist" [attr.aria-label]="i18n.t(m.tabs)">
        <button
          type="button"
          role="tab"
          id="tab-app"
          aria-controls="panel-app"
          [attr.aria-selected]="tab() === 'app'"
          (click)="tab.set('app')"
        >
          {{ i18n.t(m.quiz) }}
        </button>
        <button
          type="button"
          role="tab"
          id="tab-intro"
          aria-controls="panel-intro"
          [attr.aria-selected]="tab() === 'intro'"
          (click)="tab.set('intro')"
        >
          {{ i18n.t(m.about) }}
        </button>
      </div>
    }

    <!-- タブレット・PC ではタブを出さないので、tabpanel の役割も SP のときだけ付ける -->
    <div class="layout" [attr.data-tab]="tab()">
      <main
        id="panel-app"
        [attr.role]="wide() ? null : 'tabpanel'"
        [attr.aria-labelledby]="wide() ? null : 'tab-app'"
      >
        <router-outlet />
      </main>
      <aside
        id="panel-intro"
        [attr.role]="wide() ? null : 'tabpanel'"
        [attr.aria-labelledby]="wide() ? null : 'tab-intro'"
        [attr.aria-label]="wide() ? i18n.t(m.about) : null"
      >
        <app-intro (play)="tab.set('app')" />
      </aside>
    </div>

    <footer class="site-footer">
      {{ i18n.t(m.footer) }}
    </footer>
  `,
})
export class App {
  protected readonly i18n = inject(I18n);
  protected readonly m = M;
  protected readonly appName = APP_NAME;
  /** SP でどちらを出すか。タブレット・PC では両方を並べるので使わない */
  protected readonly tab = signal<Tab>('app');
  /** styles.css の 2 カラムに切り替わる幅と揃える */
  protected readonly wide = signal(false);

  constructor() {
    const mq = matchMedia('(min-width: 768px)');
    this.wide.set(mq.matches);
    const onChange = (e: MediaQueryListEvent) => this.wide.set(e.matches);
    mq.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => mq.removeEventListener('change', onChange));

    // 紹介タブ内のリンクで画面を移ったら、移った先が見えるようにクイズのタブへ戻す
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.tab.set('app'));
  }
}
