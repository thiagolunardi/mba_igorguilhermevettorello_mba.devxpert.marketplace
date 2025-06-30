import { Component } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Pesquisa } from '../pesquisa/pesquisa';
import { Autenticacao } from '../autenticacao/autenticacao';
import { Favoritos } from '../favoritos/favoritos';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-header',
  imports: [
    NgbAlertModule,
    Pesquisa,
    Autenticacao,
    Favoritos,
    Menu
  ],
  templateUrl: './header.html'
})
export class Header {

}
