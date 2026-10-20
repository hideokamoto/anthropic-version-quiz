import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

export type Lang = 'ja' | 'en';

export const LANGS: readonly Lang[] = ['ja', 'en'];

/** A plain string is shown as-is in every language (model IDs, numbers, product names). */
export type Text = string | Readonly<Record<Lang, string>>;

export function tr(text: Text, lang: Lang): string {
  return typeof text === 'string' ? text : text[lang];
}

const LANG_KEY = 'anthropic-version-quiz:lang';

function isLang(value: unknown): value is Lang {
  return LANGS.includes(value as Lang);
}

/** `?lang=` in the URL wins, then the saved choice, then the browser language. */
export function detectLang(search: string, saved: string | null, browser: readonly string[]): Lang {
  const fromUrl = new URLSearchParams(search).get('lang');
  if (isLang(fromUrl)) return fromUrl;
  if (isLang(saved)) return saved;
  // The first browser language we support wins: ['fr', 'ja'] → ja, ['en-US', 'ja'] → en.
  for (const l of browser) {
    const base = l.toLowerCase().split('-')[0];
    if (isLang(base)) return base;
  }
  return 'en';
}

function readSaved(): string | null {
  try {
    return localStorage.getItem(LANG_KEY);
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly document = inject(DOCUMENT);
  readonly lang = signal<Lang>(
    detectLang(this.document.location.search, readSaved(), navigator.languages ?? []),
  );

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.lang();
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    // Drop a `?lang=` the page was opened with, so a reload keeps the language picked here.
    const url = new URL(this.document.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.delete('lang');
      history.replaceState(history.state, '', url);
    }
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // Storage unavailable: the choice lasts until the page is reloaded.
    }
  }

  t(text: Text): string {
    return tr(text, this.lang());
  }
}
