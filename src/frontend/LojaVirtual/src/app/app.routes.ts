import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { NaoEncontrado } from './pages/public/nao-encontrado/nao-encontrado';
import { PesquisaProdutos } from './pages/public/pesquisa-produtos/pesquisa-produtos';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: Home,
    data: { breadcrumb: 'Início' }
  },
  {
    path: 'Pesquisa/:textoPesquisa',
    component: PesquisaProdutos,
    data: { breadcrumb: 'Pesquisa de Produtos' }
  },
  {
    path: '**',
    component: NaoEncontrado,
    data: { breadcrumb: 'Página não Encontrada' }
  }
];
