import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { LocalizedTitleStrategy } from './i18n/title';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Hash routing so deep links work on GitHub Pages without a 404 fallback.
    provideRouter(routes, withHashLocation()),
    { provide: TitleStrategy, useExisting: LocalizedTitleStrategy },
  ],
};
