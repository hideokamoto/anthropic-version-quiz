import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="site-header">
      <a routerLink="/" class="brand">Anthropic数列クイズ</a>
      <a routerLink="/about">クレジット</a>
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
