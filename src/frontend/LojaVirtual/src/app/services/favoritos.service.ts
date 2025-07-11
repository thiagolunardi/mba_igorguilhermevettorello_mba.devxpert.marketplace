import { Injectable } from '@angular/core';

export interface Favorito {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
  imagemUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

   private favoritos: Favorito[] = [
      {
        id: 1,
        nome: 'Smartphone Modelo X',
        categoria: 'Eletrônicos',
        preco: 1999.90,
        descricao: 'Um smartphone de última geração com câmera de alta resolução e bateria de longa duração.',
        imagemUrl: 'https://via.placeholder.com/300'
      },
      {
        id: 2,
        nome: 'Notebook Pro',
        categoria: 'Computadores',
        preco: 4599.00,
        descricao: 'Performance e design em um notebook potente para trabalho e lazer.',
        imagemUrl: 'https://via.placeholder.com/300'
      },
      {
        id: 3,
        nome: 'Fone de Ouvido Sem Fio',
        categoria: 'Acessórios',
        preco: 299.50,
        descricao: 'Qualidade de som imersiva com cancelamento de ruído e design confortável.',
        imagemUrl: 'https://via.placeholder.com/300'
      }
    ];

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
