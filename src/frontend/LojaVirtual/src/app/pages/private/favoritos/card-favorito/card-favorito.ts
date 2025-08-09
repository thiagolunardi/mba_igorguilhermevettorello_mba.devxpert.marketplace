import { Component, inject, Input, OnInit } from '@angular/core';
import { FavoritosService } from '../../../../services/favoritos.service';
import { AuthService } from '../../../../services/auth.service';
import { NotificacaoService } from '../../../../services/notificacao.service';
import { ItemEmDestaqueViewModel } from '../../../public/home/item-destaque/item-em-destaque.viewmodel';
import { IMAGEM_PLACEHOLDER } from '../../../../util/constantes';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-favorito',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card-favorito.html',
  styleUrls: ['./card-favorito.scss']
})
export class CardFavorito implements OnInit {
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

  removerFavorito(): void {
    if (this.carregandoFavorito) return;

    if (!this.authService.isAuthenticated()) {
      this.notificacaoService.exibir('Faça login para remover favoritos.', 'warning');
      return;
    }

    this.carregandoFavorito = true;

    this.favoritosService.removerFavorito(this.produto.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.notificacaoService.exibir(response.message || 'Operação realizada com sucesso!', 'success');
          window.location.reload();

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
