import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Notificacao } from '../notificacao/notificacao';
import { Breadcrumb } from './breadcrumb/breadcrumb';


@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    Breadcrumb,
    Notificacao],
  templateUrl: './main-layout.html',
  styles: ``
})
export class MainLayout {

}
