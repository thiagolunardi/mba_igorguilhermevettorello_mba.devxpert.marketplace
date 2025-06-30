import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Pesquisa } from './layout/pesquisa/pesquisa';
import { Autenticacao } from "./layout/autenticacao/autenticacao";
import { Header } from "./layout/header/header";
import { Favoritos } from './layout/favoritos/favoritos';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgbAlertModule,
    NgbAlert,
    Pesquisa,
    Autenticacao,
    Header,
    Favoritos,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'LojaVirtual';
}
