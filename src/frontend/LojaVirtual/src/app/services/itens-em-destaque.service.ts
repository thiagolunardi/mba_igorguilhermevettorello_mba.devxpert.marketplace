import { inject, Injectable } from '@angular/core';
import { ItemEmDestaqueViewModel } from '../pages/public/home/item-destaque/item-em-destaque.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class ItensEmDestaqueService {
  public obterItensEmDestaque(): ItemEmDestaqueViewModel[] {
    return [
      { id: 0, nome: 'Produto 1', descricao: 'Descrição do item 1', imagem: '' },
      { id: 0, nome: 'Produto 2', descricao: 'Descrição do item 2', imagem: '' },
      { id: 0, nome: 'Produto 3', descricao: 'Descrição do item 3', imagem: '' },
      { id: 0, nome: 'Produto 4', descricao: 'Descrição do item 4', imagem: '' },
      { id: 0, nome: 'Produto 5', descricao: 'Descrição do item 5', imagem: '' },
      { id: 0, nome: 'Produto 6', descricao: 'Descrição do item 6', imagem: '' },
      { id: 0, nome: 'Produto 7', descricao: 'Descrição do item 7', imagem: '' },
      { id: 0, nome: 'Produto 8', descricao: 'Descrição do item 8', imagem: '' },

    ];
  }
}
