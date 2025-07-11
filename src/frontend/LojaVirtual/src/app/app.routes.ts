import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { NaoEncontrado } from './pages/public/nao-encontrado/nao-encontrado';
<<<<<<< HEAD
=======
import { ProdutoComponent } from './pages/public/produto/produto';
import { VendedorComponent } from './pages/public/vendedor/vendedor';
>>>>>>> 35a53e8e428e7a20c625883fb2278969b026c977
import { Favoritos } from './pages/public/favoritos/favoritos';
import { Login } from './pages/public/autenticacao/login/login';
import { Register } from './pages/public/autenticacao/register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
<<<<<<< HEAD
=======
  { path: 'produto/:id', component: ProdutoComponent },
  { path: 'vendedor', component: VendedorComponent },
>>>>>>> 35a53e8e428e7a20c625883fb2278969b026c977
  { path: 'favoritos', component: Favoritos },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', component: NaoEncontrado }
];
