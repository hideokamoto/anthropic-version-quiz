import { Component, input } from '@angular/core';
import { Link } from '../data/links';

@Component({
  selector: 'app-link-list',
  template: `
    @if (links().length) {
      <div class="link-list">
        <h4>{{ heading() }}</h4>
        <ul>
          @for (link of links(); track link.url) {
            <li>
              <a [href]="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
            </li>
          }
        </ul>
      </div>
    }
  `,
  styles: `
    h4 {
      margin: 0 0 0.25rem;
      font-size: 0.8rem;
      color: var(--muted);
      font-weight: 600;
    }
    ul {
      margin: 0;
      padding-left: 1.1rem;
    }
    li {
      margin: 0.15rem 0;
      font-size: 0.9rem;
      overflow-wrap: anywhere;
    }
  `,
})
export class LinkList {
  readonly heading = input.required<string>();
  readonly links = input.required<readonly Link[]>();
}
