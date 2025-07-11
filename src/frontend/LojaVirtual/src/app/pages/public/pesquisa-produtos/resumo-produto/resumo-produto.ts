import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdutoViewModel } from '../../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-resumo-produto',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './resumo-produto.html',
  styles: ``,
  // styleUrls: ['./resumo-produto.scss'],
})
export class ResumoProduto {
  @Input() produto!: ProdutoViewModel;
}
