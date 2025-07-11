import { inject, Injectable } from '@angular/core';
import { ItemEmDestaqueViewModel } from '../pages/public/home/item-destaque/item-em-destaque.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class ItensEmDestaqueService {
  public obterItensEmDestaque(): ItemEmDestaqueViewModel[] {
    return [
    { 
      id: 1,
      nome: 'Smartphone Modelo X',
      categoria: 'Eletrônicos',
      preco: 1999.90,
      descricao: 'Um smartphone de última geração com câmera de alta resolução e bateria de longa duração.',
      imagem: 'https://via.placeholder.com/300'
    },
    {
      id: 2,
      nome: 'Notebook Pro',
      categoria: 'Computadores',
      preco: 4599.00,
      descricao: 'Performance e design em um notebook potente para trabalho e lazer.',
      imagem: 'https://via.placeholder.com/300'
    },
    {
      id: 3,
      nome: 'Fone de Ouvido Sem Fio',
      categoria: 'Acessórios',
      preco: 299.50,
      descricao: 'Qualidade de som imersiva com cancelamento de ruído e design confortável.',
      imagem: 'https://via.placeholder.com/300'
    },
        {
      id: 4,
      nome: 'Fone de Ouvido Sem Fio',
      categoria: 'Acessórios',
      preco: 299.50,
      descricao: 'Qualidade de som imersiva com cancelamento de ruído e design confortável.',
      imagem: 'https://via.placeholder.com/300'
    },
            {
      id: 5,
      nome: 'Fone de Ouvido Sem Fio',
      categoria: 'Acessórios',
      preco: 299.50,
      descricao: 'Qualidade de som imersiva com cancelamento de ruído e design confortável.',
      imagem: 'https://via.placeholder.com/300'
    }
    ];
  }
}
