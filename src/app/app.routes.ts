import { Routes } from '@angular/router';
import { AboutPage } from './pages/about';
import { HomePage } from './pages/home';
import { LicensesPage } from './pages/licenses';
import { QuizPage } from './pages/quiz';
import { ResultPage } from './pages/result';

// Page titles live in data.title (not title) so LocalizedTitleStrategy can switch their language.
export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'quiz', component: QuizPage, data: { title: { ja: '出題中', en: 'Quiz' } } },
  { path: 'result', component: ResultPage, data: { title: { ja: '結果', en: 'Result' } } },
  { path: 'about', component: AboutPage, data: { title: { ja: 'クレジット', en: 'Credits' } } },
  {
    path: 'licenses',
    component: LicensesPage,
    data: { title: { ja: 'ライセンス', en: 'Licenses' } },
  },
  { path: '**', redirectTo: '' },
];
