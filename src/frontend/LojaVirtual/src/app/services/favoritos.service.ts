import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  favoritos: any[] = [];

  constructor() { }

  adicionarFavorito(produto: any) {
    if (!this.favoritos.find(item => item.id === produto.id)) {
      this.favoritos.push(produto);
    }
  }

  removerFavorito(produto: any) {
      this.favoritos = this.favoritos.filter(item => item.id !== produto.id);
  }
}
