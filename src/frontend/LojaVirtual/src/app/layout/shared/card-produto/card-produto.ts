import { Component, inject, Input, OnInit } from '@angular/core';
import { IMAGEM_PLACEHOLDER } from '../../../util/constantes';
import { ItemEmDestaqueViewModel } from '../../../pages/public/home/item-destaque/item-em-destaque.viewmodel';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FavoritosService } from '../../../services/favoritos.service';
import { AuthService } from '../../../services/auth.service';
import { NotificacaoService } from '../../../services/notificacao.service';

@Component({
  selector: 'app-card-produto',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card-produto.html',
  styleUrls: ['./card-produto.scss']
})
export class CardProduto implements OnInit {
  private favoritosService = inject(FavoritosService);
  private authService = inject(AuthService);
  private notificacaoService = inject(NotificacaoService);

  @Input() produto!: ItemEmDestaqueViewModel;
  @Input() exibirBadge: boolean = false;
  isFavorito = false;
  carregandoFavorito = false;

  get imagemSrc(): string {
    return this.produto?.src ? this.produto.src : IMAGEM_PLACEHOLDER;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated() && this.produto?.id) {
      this.verificarStatusFavorito();
    }
  }

  toggleFavorito(): void {
    if (this.carregandoFavorito) return;

    if (!this.authService.isAuthenticated()) {
      this.notificacaoService.exibir('Faça login para adicionar favoritos.', 'warning');
      return;
    }

    this.carregandoFavorito = true;
    const acao = this.isFavorito
      ? this.favoritosService.removerFavorito(this.produto.id)
      : this.favoritosService.adicionarFavorito(this.produto.id);

    acao.subscribe({
      next: (response) => {
        if (response.success) {
          this.isFavorito = !this.isFavorito;
          this.notificacaoService.exibir(response.message || 'Operação realizada com sucesso!', 'success');
        } else {
          this.notificacaoService.exibir(response.message || 'Ocorreu um erro.', 'danger');
        }
      },
      error: () => {
        this.notificacaoService.exibir('Erro de comunicação com o servidor.', 'danger');
      },
      complete: () => {
        this.carregandoFavorito = false;
      }
    });
  }

  private verificarStatusFavorito(): void {
    this.favoritosService.verificarSeFavorito(this.produto.id).subscribe({
      next: (isFavorito) => {
        this.isFavorito = isFavorito;
      },
      error: () => {
        this.isFavorito = false;
      }
    });
  }
}
