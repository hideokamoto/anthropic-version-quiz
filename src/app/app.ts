import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="site-header">
      <a routerLink="/" class="brand">Anthropic数列クイズ</a>
      <nav>
        <a routerLink="/about">クレジット</a>
        <a routerLink="/licenses">ライセンス</a>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
    <footer class="site-footer">
      非公式のファンメイドクイズです。Anthropic とは関係ありません。
    </footer>
  `,
})
export class App {}
