import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProdutoViewModel } from '../../../../../services/produto.viewmodel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-produto', // O seletor foi mantido por ser descritivo
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './info-produto.html', // Caminho do template atualizado
  styleUrls: ['./info-produto.scss']
})
export class InfoProdutoComponent { // Nome da classe atualizado
  @Input() produto!: ProdutoViewModel;
}
