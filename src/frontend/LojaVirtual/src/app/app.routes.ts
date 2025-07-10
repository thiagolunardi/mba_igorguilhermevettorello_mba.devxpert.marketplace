import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { NaoEncontrado } from './pages/public/nao-encontrado/nao-encontrado';
import { ProdutoComponent } from './pages/public/produto/produto';
import { VendedorComponent } from './pages/public/vendedor/vendedor';
import { PesquisaProdutos } from './pages/public/pesquisa-produtos/pesquisa-produtos';

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
    path: '**',
    component: NaoEncontrado,
    data: { breadcrumb: 'Página não Encontrada' }
  }
];
