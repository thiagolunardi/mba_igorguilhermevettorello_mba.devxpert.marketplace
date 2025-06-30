import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Pesquisa } from '../pesquisa/pesquisa';
import { Autenticacao } from '../autenticacao/autenticacao';
import { Favoritos } from '../favoritos/favoritos';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-header',
  imports: [
    RouterOutlet,
    NgbAlertModule,
    NgbAlert,
    Pesquisa,
    Autenticacao,
    Header,
    Favoritos,
    Menu
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
