// src/app/services/product.service.ts
import { Injectable } from '@angular/core';

export interface Produto {
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
export class ProductService {

  //FIX: Provisorio
  private produtos: Produto[] = [
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
    },
        {
      id: 4,
      nome: 'Fone de Ouvido Sem Fio',
      categoria: 'Acessórios',
      preco: 299.50,
      descricao: 'Qualidade de som imersiva com cancelamento de ruído e design confortável.',
      imagemUrl: 'https://via.placeholder.com/300'
    }
  ];

  constructor() { }

  getProdutos(): Produto[] {
    return this.produtos;
  }

  getProdutoById(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }
}