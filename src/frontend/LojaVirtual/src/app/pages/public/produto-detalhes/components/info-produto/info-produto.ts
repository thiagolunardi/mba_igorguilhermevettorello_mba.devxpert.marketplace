import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProdutoViewModel } from '../../../../../services/produto.viewmodel';

@Component({
  selector: 'app-info-produto', // O seletor foi mantido por ser descritivo
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './info-produto.html', // Caminho do template atualizado
  styleUrls: ['./info-produto.scss']
})
export class InfoProdutoComponent { // Nome da classe atualizado
  @Input() produto!: ProdutoViewModel;
}