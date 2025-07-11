import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { NaoEncontrado } from './pages/public/nao-encontrado/nao-encontrado';
import { Favoritos } from './pages/public/favoritos/favoritos';
import { Login } from './pages/public/autenticacao/login/login';
import { Register } from './pages/public/autenticacao/register/register';
import { ProdutoComponent } from './pages/public/produto/produto';
import { VendedorComponent } from './pages/public/vendedor/vendedor';
import { PesquisaProdutos } from './pages/public/pesquisa-produtos/pesquisa-produtos';
import { Erro } from './pages/public/erro/erro';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    data: { breadcrumb: 'Início' }
  },
  {
    path: 'favoritos',
    component: Favoritos,
    data: { breadcrumb: 'Favoritos' }
  },
  {
    path: 'pesquisa',
    component: PesquisaProdutos,
    data: { breadcrumb: 'Pesquisa de Produtos' }
  },
  {
    path: 'produto/:id',
    component: ProdutoComponent,
    data: { breadcrumb: 'Detalhes do Produto' }
  },
  {
    path: 'Vendedor',
    component: VendedorComponent,
    data: { breadcrumb: 'Vendedor' }
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'erro',
    component: Erro,
    data: { breadcrumb: 'Erro' }
  },
  {
    path: '**',
    component: NaoEncontrado,
    data: { breadcrumb: 'Página não Encontrada' }
  }
];
