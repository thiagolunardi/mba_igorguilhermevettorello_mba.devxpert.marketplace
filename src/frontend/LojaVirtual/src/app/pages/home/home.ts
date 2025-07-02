import { Component } from '@angular/core';
import { Carrossel } from "./carrossel/carrossel";
import { Destaque } from "./destaque/destaque";

@Component({
  selector: 'app-home',
  imports: [Carrossel, Destaque],
  templateUrl: './home.html'
})
export class Home {

}
