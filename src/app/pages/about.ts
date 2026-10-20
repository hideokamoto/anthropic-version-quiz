import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CREDIT_LINKS, DOC_LINKS, Link, NEWS_LINKS } from '../data/links';
import { VERIFIED_AT } from '../data/questions';
import { I18n } from '../i18n/i18n';
import { SEQUENCE } from '../data/sequence';
import { LinkList } from '../shared/link-list';

const M = {
  top: { ja: '← トップへ', en: '← Back to top' },
  term: { ja: '項', en: 'Term' },
  models: { ja: 'モデル', en: 'Models' },
  released: { ja: '公開', en: 'Released' },
  pages: { ja: '公式ページ', en: 'Official pages' },
  references: { ja: '参考資料', en: 'References' },
  docs: { ja: 'ドキュメント・ヘルプ', en: 'Docs and help' },
  news: { ja: '発表記事', en: 'Announcements' },
} as const;

@Component({
  selector: 'app-about',
  imports: [RouterLink, LinkList],
  template: `
    <p>
      <a routerLink="/">{{ i18n.t(m.top) }}</a>
    </p>

    @if (i18n.lang() === 'ja') {
      <h2>Anthropic数列とは</h2>
      <p>
        Claude のバージョン番号を 3, 3.5, 3.5v2, 3.7, 4, 4.1, 4.5, 4.6, 4.7, 4.8, 5, 5.1, 5.5
        と並べた「数列」で、各項に当たるモデルは次のとおりです。
      </p>
    } @else {
      <h2>What is the Anthropic Sequence?</h2>
      <p>
        It is the “sequence” of Claude version numbers: 3, 3.5, 3.5v2, 3.7, 4, 4.1, 4.5, 4.6, 4.7,
        4.8, 5, 5.1, 5.5. The models behind each term are listed below.
      </p>
    }
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>{{ i18n.t(m.term) }}</th>
            <th>{{ i18n.t(m.models) }}</th>
            <th>{{ i18n.t(m.released) }}</th>
            <th>{{ i18n.t(m.pages) }}</th>
          </tr>
        </thead>
        <tbody>
          @for (row of sequence; track row.term) {
            <tr>
              <td class="term">{{ row.term }}</td>
              <td>{{ i18n.t(row.models) }}</td>
              <td class="date">{{ i18n.t(row.date) }}</td>
              <td>
                @for (link of row.links; track link.url) {
                  <a [href]="link.url" target="_blank" rel="noopener noreferrer">{{
                    i18n.t(link.label)
                  }}</a>
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    @if (i18n.lang() === 'ja') {
      <p class="note">
        「3.5v2」は通称です。公式には「upgraded Claude 3.5 Sonnet」（ID:
        claude-3-5-sonnet-20241022）と呼ばれていました。
      </p>

      <h2>クレジット</h2>
      <ul>
        <li>
          アイディア元：<a [href]="credit.watany.url" target="_blank" rel="noopener noreferrer">{{
            i18n.t(credit.watany.label)
          }}</a>
          さんの
          <a [href]="credit.watanyPost.url" target="_blank" rel="noopener noreferrer">{{
            i18n.t(credit.watanyPost.label)
          }}</a>
        </li>
        <li>
          ソースコード：<a [href]="credit.repo.url" target="_blank" rel="noopener noreferrer">{{
            i18n.t(credit.repo.label)
          }}</a>
          （ライセンスは<a routerLink="/licenses">ライセンスページ</a>を参照）
        </li>
      </ul>
      <p class="note">
        このクイズは非公式のファンメイドで、Anthropic とは関係ありません。問題の正解は
        {{ verifiedAt }}
        時点の公式ドキュメントで確認したもので、その後の更新で変わる可能性があります。
      </p>
    } @else {
      <p class="note">
        “3.5v2” is a nickname. Officially it was called the “upgraded Claude 3.5 Sonnet” (ID:
        claude-3-5-sonnet-20241022).
      </p>

      <h2>Credits</h2>
      <ul>
        <li>
          Idea:
          <a [href]="credit.watanyPost.url" target="_blank" rel="noopener noreferrer">{{
            i18n.t(credit.watanyPost.label)
          }}</a>
          by
          <a [href]="credit.watany.url" target="_blank" rel="noopener noreferrer">{{
            i18n.t(credit.watany.label)
          }}</a>
        </li>
        <li>
          Source code:
          <a [href]="credit.repo.url" target="_blank" rel="noopener noreferrer">{{
            i18n.t(credit.repo.label)
          }}</a>
          (see the <a routerLink="/licenses">licenses page</a> for the license)
        </li>
      </ul>
      <p class="note">
        This is an unofficial fan-made quiz, not affiliated with Anthropic. The answers were checked
        against the official documentation as of {{ verifiedAt }} and may change with later updates.
      </p>
    }

    <h2>{{ i18n.t(m.references) }}</h2>
    <app-link-list [heading]="i18n.t(m.docs)" [links]="docs" />
    <app-link-list [heading]="i18n.t(m.news)" [links]="news" />
  `,
  styles: `
    h2 {
      font-size: 1.2rem;
      margin: 1.75rem 0 0.5rem;
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
      vertical-align: top;
    }
    td a {
      display: block;
    }
    .term {
      font-family: var(--mono);
      font-weight: 700;
    }
    .date {
      white-space: nowrap;
    }
    .note {
      color: var(--muted);
      font-size: 0.9rem;
    }
    app-link-list {
      display: block;
      margin-bottom: 1rem;
    }
  `,
})
export class AboutPage {
  protected readonly i18n = inject(I18n);
  protected readonly m = M;
  protected readonly sequence = SEQUENCE;
  protected readonly credit = CREDIT_LINKS;
  protected readonly verifiedAt = VERIFIED_AT;
  protected readonly docs: Link[] = Object.values(DOC_LINKS);
  protected readonly news: Link[] = Object.values(NEWS_LINKS);
}
