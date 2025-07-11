// favoritos.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FavoritosService } from '../../../services/favoritos.service';

export interface ItemEmDestaqueViewModel {
  id: number;
  imagem: string;
  categoria: string;
  descricao: string;
  nome: string;
  preco: number;
}

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './favoritos.html',
  styleUrls: ['./favoritos.scss'] 
})

export class Favoritos implements OnInit {

  public itensEmDestaque: ItemEmDestaqueViewModel[] = [];

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit() {
    this.itensEmDestaque = this.obterItensEmDestaque();
  }

  public obterItensEmDestaque(): ItemEmDestaqueViewModel[] {
    return [
      { 
        id: 1,
        nome: 'Smartphone Modelo X',
        categoria: 'Eletrônicos',
        preco: 1999.90,
        descricao: 'Um smartphone de última geração com câmera de alta resolução e bateria de longa duração.',
        imagem: 'https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg'
      },
      {
        id: 2,
        nome: 'Notebook Pro',
        categoria: 'Computadores',
        preco: 4599.00,
        descricao: 'Performance e design em um notebook potente para trabalho e lazer.',
        imagem: 'https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg'
      },
      {
        id: 3,
        nome: 'Fone de Ouvido Sem Fio',
        categoria: 'Acessórios',
        preco: 299.50,
        descricao: 'Qualidade de som imersiva com cancelamento de ruído e design confortável.',
        imagem: 'https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg'
      }
    ];
  }

  adicionarFavorito(produto: ItemEmDestaqueViewModel) {
    this.favoritosService.adicionarFavorito(produto);
  }

  removerFavorito(produto: ItemEmDestaqueViewModel) {
    this.favoritosService.removerFavorito(produto);
  }

  trackById(index: number, item: ItemEmDestaqueViewModel): number {
  return item.id;
}
}
