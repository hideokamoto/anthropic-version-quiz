import { effect, inject, Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { I18n, Text, tr } from './i18n';

export const APP_NAME: Text = { ja: 'Anthropic数列クイズ', en: 'Anthropic Sequence Quiz' };

/** Routes put a `Text` in `data.title`; the page title follows the language switch. */
@Injectable({ providedIn: 'root' })
export class LocalizedTitleStrategy extends TitleStrategy {
  private readonly i18n = inject(I18n);
  private readonly page = signal<Text | null>(null);

  constructor() {
    super();
    const title = inject(Title);
    effect(() => {
      const lang = this.i18n.lang();
      const page = this.page();
      const app = tr(APP_NAME, lang);
      title.setTitle(page ? `${tr(page, lang)} | ${app}` : app);
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let route: ActivatedRouteSnapshot = snapshot.root;
    while (route.firstChild) route = route.firstChild;
    this.page.set((route.data['title'] as Text | undefined) ?? null);
  }
}
