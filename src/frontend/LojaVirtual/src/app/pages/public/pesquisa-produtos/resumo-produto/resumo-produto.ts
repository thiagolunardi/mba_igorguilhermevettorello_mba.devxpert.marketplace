import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdutoViewModel } from '../../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-resumo-produto',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './resumo-produto.html',
  styles: ``
})
export class ResumoProduto {
  @Input() produto!: ProdutoViewModel;

  favoritarProduto() {
    alert(`Produto ${this.produto.nome} adicionado aos favoritos!`);
  }
}
