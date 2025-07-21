import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from "./layout/header/header";
import { Footer } from "./layout/footer/footer";
import { Breadcrumb } from './layout/breadcrumb/breadcrumb';
import { Notificacao } from "./layout/notificacao/notificacao";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Breadcrumb,
    Footer,
    Notificacao
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'LojaVirtual';
}
