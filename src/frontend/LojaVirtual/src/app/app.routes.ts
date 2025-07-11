import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { NaoEncontrado } from './pages/public/nao-encontrado/nao-encontrado';
import { ProdutoComponent } from './pages/public/produto/produto';
import { VendedorComponent } from './pages/public/vendedor/vendedor';
import { Favoritos } from './pages/public/favoritos/favoritos';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'produto/:id', component: ProdutoComponent },
  { path: 'vendedor', component: VendedorComponent },
  { path: 'favoritos', component: Favoritos },
  { path: '**', component: NaoEncontrado }
];
