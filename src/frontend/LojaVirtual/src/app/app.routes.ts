import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { NaoEncontrado } from './pages/public/nao-encontrado/nao-encontrado';
import { Favoritos } from './pages/public/favoritos/favoritos';
import { ProdutoDetalhesComponent } from './pages/public/produto-detalhes/produto-detalhes';
import { VendedorComponent } from './pages/public/vendedor/vendedor';
import { PesquisaProdutos } from './pages/public/pesquisa-produtos/pesquisa-produtos';
import { Erro } from './pages/public/erro/erro';
import { Login } from './pages/public/autenticacao/login/login';
import { Register } from './pages/public/autenticacao/register/register';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
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
        canActivate: [authGuard],
        data: { breadcrumb: 'Favoritos' }
      },
      {
        path: 'pesquisa',
        component: PesquisaProdutos,
        data: { breadcrumb: 'Pesquisa de Produtos' }
      },
      {
        path: 'produto/:id',
        component: ProdutoDetalhesComponent,
        data: { breadcrumb: 'Detalhes do Produto' }
      },
      {
        path: 'vendedor/:id',
        component: VendedorComponent,
        data: { breadcrumb: 'Vendedor' }
      },
      {
        path: 'erro',
        component: Erro,
        data: { breadcrumb: 'Erro' }
      }
    ]
  },

  {
    path: '',
    component: AuthLayout,
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: Login },
      { path: 'cadastro', component: Register },
    ]
  },

  {
    path: '**',
    component: NaoEncontrado,
    data: { breadcrumb: 'Página não Encontrada' }
  }
]
