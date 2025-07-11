import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { NaoEncontrado } from './pages/public/nao-encontrado/nao-encontrado';
import { Favoritos } from './pages/public/favoritos/favoritos';
import { Login } from './pages/public/autenticacao/login/login';
import { Register } from './pages/public/autenticacao/register/register';
import { ProdutoComponent } from './pages/public/produto/produto';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'favoritos', component: Favoritos },
  { path: 'produto/:id', component: ProdutoComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', component: NaoEncontrado }
];
