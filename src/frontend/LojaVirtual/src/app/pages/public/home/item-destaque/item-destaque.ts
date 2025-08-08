import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemEmDestaqueViewModel } from '../item-destaque/item-em-destaque.viewmodel';
import { IMAGEM_PLACEHOLDER } from '../../../../util/constantes';
import { FavoritosService } from '../../../../services/favoritos.service';
import { AuthService } from '../../../../services/auth.service';
import { NotificacaoService } from '../../../../services/notificacao.service';

@Component({
  selector: 'app-item-destaque',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './item-destaque.html',
  styleUrls: ['./item-destaque.scss']
})
export class ItemDestaqueComponent implements OnInit {
  @Input() item!: ItemEmDestaqueViewModel;
  private favoritosService = inject(FavoritosService);
  private authService = inject(AuthService);
  private notificacaoService = inject(NotificacaoService);

  isFavorito = false;
  carregandoFavorito = false;

  ngOnInit(): void {
    if (this.authService.isAuthenticated() && this.item?.id) {
      this.verificarStatusFavorito();
    }
  }

  get imagemSrc(): string {
    if (this.item?.src) {
      return `data:image/jpeg;base64,${this.item.src}`;
    }
    return IMAGEM_PLACEHOLDER;
  }

  toggleFavorito(): void {
    if (this.carregandoFavorito) return;

    if (!this.authService.isAuthenticated()) {
      this.notificacaoService.exibir('Faça login para adicionar favoritos.', 'warning');
      return;
    }

    this.carregandoFavorito = true;
    const acao = this.isFavorito
      ? this.favoritosService.removerFavorito(this.item.id)
      : this.favoritosService.adicionarFavorito(this.item.id);

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
    this.favoritosService.verificarSeFavorito(this.item.id).subscribe({
      next: (isFavorito) => {
        this.isFavorito = isFavorito;
      },
      error: () => {
        this.isFavorito = false;
      }
    });
  }
}