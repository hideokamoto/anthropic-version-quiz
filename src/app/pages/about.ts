import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CREDIT_LINKS, DOC_LINKS, Link, NEWS_LINKS } from '../data/links';
import { VERIFIED_AT } from '../data/questions';
import { SEQUENCE } from '../data/sequence';
import { LinkList } from '../shared/link-list';

@Component({
  selector: 'app-about',
  imports: [RouterLink, LinkList],
  template: `
    <p><a routerLink="/">← トップへ</a></p>

    <h2>Anthropic数列とは</h2>
    <p>
      Claude のバージョン番号を 3, 3.5, 3.5v2, 3.7, 4, 4.1, 4.5, 4.6, 4.7, 4.8, 5, 5.1, 5.5
      と並べた「数列」です。 各項に当たるモデルは次のとおりです。
    </p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>項</th>
            <th>モデル</th>
            <th>公開</th>
            <th>公式ページ</th>
          </tr>
        </thead>
        <tbody>
          @for (row of sequence; track row.term) {
            <tr>
              <td class="term">{{ row.term }}</td>
              <td>{{ row.models }}</td>
              <td class="date">{{ row.date }}</td>
              <td>
                @for (link of row.links; track link.url) {
                  <a [href]="link.url" target="_blank" rel="noopener noreferrer">{{
                    link.label
                  }}</a>
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    <p class="note">
      「3.5v2」は通称です。公式には「upgraded Claude 3.5 Sonnet」（ID:
      claude-3-5-sonnet-20241022）と呼ばれていました。
    </p>

    <h2>クレジット</h2>
    <ul>
      <li>
        アイディア元：<a [href]="credit.watany.url" target="_blank" rel="noopener noreferrer">{{
          credit.watany.label
        }}</a>
        さんが X に投稿した「Anthropic数列」
      </li>
      <li>
        ソースコード：<a [href]="credit.repo.url" target="_blank" rel="noopener noreferrer">{{
          credit.repo.label
        }}</a>
      </li>
    </ul>
    <p class="note">
      このクイズは非公式のファンメイドで、Anthropic とは関係ありません。問題の正解は
      {{ verifiedAt }}
      時点の公式ドキュメントで確認したもので、その後の更新で変わる可能性があります。
    </p>

    <h2>参考資料</h2>
    <app-link-list heading="ドキュメント・ヘルプ" [links]="docs" />
    <app-link-list heading="発表記事" [links]="news" />
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
  protected readonly sequence = SEQUENCE;
  protected readonly credit = CREDIT_LINKS;
  protected readonly verifiedAt = VERIFIED_AT;
  protected readonly docs: Link[] = Object.values(DOC_LINKS);
  protected readonly news: Link[] = Object.values(NEWS_LINKS);
}
