import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CREDIT_LINKS, LICENSE_LINKS } from '../data/links';
import { I18n } from '../i18n/i18n';
import {
  parseThirdPartyLicenses,
  THIRD_PARTY_LICENSES_FILE,
  ThirdPartyLicense,
} from '../licenses/third-party';

type LoadState = 'loading' | 'loaded' | 'unavailable';

const M = {
  top: { ja: '← トップへ', en: '← Back to top' },
  loading: { ja: '読み込み中…', en: 'Loading…' },
  unavailable: {
    ja: 'ライセンス一覧を読み込めませんでした。開発サーバー（ng serve）ではこのファイルが作られません。本番ビルドでは表示されます。',
    en: 'Could not load the license list. The development server (ng serve) does not create this file; it is shown in production builds.',
  },
  package: { ja: 'パッケージ', en: 'Package' },
  license: { ja: 'ライセンス', en: 'License' },
  fullText: { ja: 'ライセンス全文', en: 'Full license texts' },
} as const;

@Component({
  selector: 'app-licenses',
  imports: [RouterLink],
  template: `
    <p>
      <a routerLink="/">{{ i18n.t(m.top) }}</a>
    </p>

    @if (i18n.lang() === 'ja') {
      <h2>このアプリのライセンス</h2>
      <p>
        このアプリのソースコードは
        <strong>GNU General Public License v3.0（GPL-3.0）</strong>で公開しています。
      </p>
    } @else {
      <h2>License of this app</h2>
      <p>
        The source code of this app is released under the
        <strong>GNU General Public License v3.0 (GPL-3.0)</strong>.
      </p>
    }
    <ul>
      <li>
        <a [href]="links.appLicense.url" target="_blank" rel="noopener noreferrer">{{
          i18n.t(links.appLicense.label)
        }}</a>
      </li>
      <li>
        <a [href]="links.gpl3.url" target="_blank" rel="noopener noreferrer">{{
          i18n.t(links.gpl3.label)
        }}</a>
      </li>
      <li>
        <a [href]="repo.url" target="_blank" rel="noopener noreferrer">{{ i18n.t(repo.label) }}</a>
      </li>
    </ul>

    @if (i18n.lang() === 'ja') {
      <h2>利用しているライブラリのライセンス</h2>
      <p>
        公開しているアプリに同梱しているライブラリです。一覧と全文は、ビルド時に Angular CLI
        が出力する
        <a [href]="file" target="_blank" rel="noopener">{{ file }}</a>
        から読み込んでいます。
      </p>
    } @else {
      <h2>Licenses of bundled libraries</h2>
      <p>
        These are the libraries bundled into the published app. The list and full texts are loaded
        from <a [href]="file" target="_blank" rel="noopener">{{ file }}</a
        >, which the Angular CLI writes at build time.
      </p>
    }

    @switch (state()) {
      @case ('loading') {
        <p class="note">{{ i18n.t(m.loading) }}</p>
      }
      @case ('unavailable') {
        <p class="note">{{ i18n.t(m.unavailable) }}</p>
      }
      @case ('loaded') {
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{{ i18n.t(m.package) }}</th>
                <th>{{ i18n.t(m.license) }}</th>
              </tr>
            </thead>
            <tbody>
              @for (pkg of packages(); track pkg.name) {
                <tr>
                  <td>
                    <a
                      [href]="'https://www.npmjs.com/package/' + pkg.name"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ pkg.name }}</a
                    >
                  </td>
                  <td>{{ pkg.license }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <h3>{{ i18n.t(m.fullText) }}</h3>
        @for (pkg of packages(); track pkg.name) {
          <details>
            <summary>{{ pkg.name }} ({{ pkg.license }})</summary>
            <pre>{{ pkg.text }}</pre>
          </details>
        }
      }
    }
  `,
  styles: `
    h2 {
      font-size: 1.2rem;
      margin: 1.75rem 0 0.5rem;
    }
    h3 {
      font-size: 1rem;
      margin: 1.25rem 0 0.5rem;
    }
    .table-wrap {
      overflow-x: auto;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 0.9rem;
    }
    th,
    td {
      text-align: left;
      padding: 0.4rem 0.5rem;
      border-bottom: 1px solid var(--border);
    }
    details {
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--surface);
      margin: 0.4rem 0;
      padding: 0.4rem 0.75rem;
    }
    summary {
      cursor: pointer;
      font-family: var(--mono);
      font-size: 0.9rem;
    }
    pre {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      font-size: 0.75rem;
      max-height: 20rem;
      overflow-y: auto;
    }
    .note {
      color: var(--muted);
      font-size: 0.9rem;
    }
  `,
})
export class LicensesPage implements OnInit {
  protected readonly i18n = inject(I18n);
  protected readonly m = M;
  protected readonly links = LICENSE_LINKS;
  protected readonly repo = CREDIT_LINKS.repo;
  protected readonly file = THIRD_PARTY_LICENSES_FILE;
  protected readonly state = signal<LoadState>('loading');
  protected readonly packages = signal<ThirdPartyLicense[]>([]);

  async ngOnInit(): Promise<void> {
    try {
      const response = await fetch(THIRD_PARTY_LICENSES_FILE);
      const packages = response.ok ? parseThirdPartyLicenses(await response.text()) : [];
      this.packages.set(packages);
      this.state.set(packages.length ? 'loaded' : 'unavailable');
    } catch {
      this.state.set('unavailable');
    }
  }
}
