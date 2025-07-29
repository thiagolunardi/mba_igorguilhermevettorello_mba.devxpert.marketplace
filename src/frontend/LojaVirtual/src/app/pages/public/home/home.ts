import { Component } from '@angular/core';
import { Carrossel } from "./carrossel/carrossel";
import { DestaqueComponent } from "./destaque/destaque";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Carrossel, DestaqueComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

}
