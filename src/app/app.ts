import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Intro } from './intro/intro';

type Tab = 'app' | 'intro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Intro],
  template: `
    <header class="site-header">
      <a routerLink="/" class="brand">Anthropic数列クイズ</a>
      <nav>
        <a routerLink="/about">クレジット</a>
        <a routerLink="/licenses">ライセンス</a>
      </nav>
    </header>

    @if (!wide()) {
      <div class="tabs" role="tablist" aria-label="表示の切り替え">
        <button
          type="button"
          role="tab"
          id="tab-app"
          aria-controls="panel-app"
          [attr.aria-selected]="tab() === 'app'"
          (click)="tab.set('app')"
        >
          クイズ
        </button>
        <button
          type="button"
          role="tab"
          id="tab-intro"
          aria-controls="panel-intro"
          [attr.aria-selected]="tab() === 'intro'"
          (click)="tab.set('intro')"
        >
          このクイズについて
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
        [attr.aria-label]="wide() ? 'このクイズについて' : null"
      >
        <app-intro (play)="tab.set('app')" />
      </aside>
    </div>

    <footer class="site-footer">
      非公式のファンメイドクイズです。Anthropic とは関係ありません。
    </footer>
  `,
})
export class App {
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
