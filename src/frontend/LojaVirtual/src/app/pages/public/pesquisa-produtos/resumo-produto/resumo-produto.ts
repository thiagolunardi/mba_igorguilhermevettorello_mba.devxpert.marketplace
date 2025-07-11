import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdutoViewModel } from '../../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { CurrencyPipe } from '@angular/common';
import { NotificacaoService } from '../../../../services/notificacao.service';

@Component({
  selector: 'app-resumo-produto',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './resumo-produto.html',
  styles: ``
})
export class ResumoProduto {
  @Input() produto!: ProdutoViewModel;
  private notificacaoService = inject(NotificacaoService);

  favoritarProduto() {
    this.notificacaoService.exibir(`Produto ${this.produto.nome} adicionado aos favoritos!`, 'success');
  }
}
