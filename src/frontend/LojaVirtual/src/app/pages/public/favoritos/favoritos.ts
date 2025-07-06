import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../../services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.html',


})

export class Favoritos implements OnInit {
  produtos = [
    { id: 1, nome: 'Produto 1' },
    { id: 2, nome: 'Produto 2' },
    { id: 3, nome: 'Produto 3' }
  ];

  constructor(private favoritosService: FavoritosService) {}


  ngOnInit(){
  }

    adicionarFavorito(produto: any) {
    this.favoritosService.adicionarFavorito(produto);
  }

    removerFavorito(produto: any) {
      this.favoritosService.removerFavorito(produto);
  }
}
