import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink],
  templateUrl: './favoritos.html',
  styleUrls: ['./favoritos.scss']
})
export class Favoritos {
  quantidadeFavoritos = 0; // Será implementado quando conectar com o serviço
}
