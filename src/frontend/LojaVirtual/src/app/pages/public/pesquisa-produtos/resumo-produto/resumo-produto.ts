import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdutoViewModel } from '../../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { CurrencyPipe } from '@angular/common';
import { NotificacaoService } from '../../../../services/notificacao.service';
import { IMAGEM_PLACEHOLDER } from '../../../../util/constantes';

@Component({
  selector: 'app-resumo-produto',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './resumo-produto.html',
  styleUrl: './resumo-produto.scss'
})
export class ResumoProduto {
  @Input() produto!: ProdutoViewModel;
  private notificacaoService = inject(NotificacaoService);

  get imagemSrc(): string {
    return this.produto?.src ? this.produto.src : IMAGEM_PLACEHOLDER;
  }

  favoritarProduto() {
    this.notificacaoService.exibir(`Produto ${this.produto.nome} adicionado aos favoritos!`, 'success');
  }
}
