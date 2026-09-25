import { Routes } from '@angular/router';
import { AboutPage } from './pages/about';
import { HomePage } from './pages/home';
import { QuizPage } from './pages/quiz';
import { ResultPage } from './pages/result';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Anthropic数列クイズ' },
  { path: 'quiz', component: QuizPage, title: '出題中 | Anthropic数列クイズ' },
  { path: 'result', component: ResultPage, title: '結果 | Anthropic数列クイズ' },
  { path: 'about', component: AboutPage, title: 'クレジット | Anthropic数列クイズ' },
  { path: '**', redirectTo: '' },
];
