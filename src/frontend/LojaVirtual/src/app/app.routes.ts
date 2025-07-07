import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { NaoEncontrado } from './pages/public/nao-encontrado/nao-encontrado';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: '**', component: NaoEncontrado }
];
