import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProdutoViewModel } from '../../../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { IMAGEM_PLACEHOLDER } from '../../../../../util/constantes';

@Component({
  selector: 'app-info-produto',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './info-produto.html',
  styleUrls: ['./info-produto.scss']
})
export class InfoProdutoComponent {
  @Input() produto!: ProdutoViewModel;

  get imagemSrc(): string {
    return this.produto?.src ? this.produto.src : IMAGEM_PLACEHOLDER;
  }
}
