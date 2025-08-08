import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProdutoViewModel } from '../../../../../services/produto.viewmodel';
import { RouterLink } from '@angular/router';
import { FavoritosService } from '../../../../../services/favoritos.service';
import { AuthService } from '../../../../../services/auth.service';
import { NotificacaoService } from '../../../../../services/notificacao.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-info-produto', // O seletor foi mantido por ser descritivo
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './info-produto.html', // Caminho do template atualizado
  styleUrls: ['./info-produto.scss']
})
export class InfoProdutoComponent implements OnInit { // Nome da classe atualizado
  @Input() produto!: ProdutoViewModel;
  
  private favoritosService = inject(FavoritosService);
  private authService = inject(AuthService);
  private notificacaoService = inject(NotificacaoService);
  
  isFavorito: boolean = false;
  carregandoFavorito: boolean = false;

  ngOnInit(): void {
    if (this.authService.isAuthenticated() && this.produto?.id) {
      this.verificarStatusFavorito();
    }
  }

  private verificarStatusFavorito() {
    this.favoritosService.verificarSeFavorito(this.produto.id)
      .subscribe({
        next: (isFavorito) => {
          this.isFavorito = isFavorito;
        },
        error: (erro) => {
          console.error('Erro ao verificar status do favorito:', erro);
          this.isFavorito = false;
        }
      });
  }

  toggleFavorito() {
    if (!this.authService.isAuthenticated()) {
      this.notificacaoService.exibir('Faça login para adicionar favoritos', 'warning');
      return;
    }

    if (!this.produto?.id) {
      this.notificacaoService.exibir('Erro: ID do produto não encontrado', 'danger');
      return;
    }

    this.carregandoFavorito = true;

    if (this.isFavorito) {
      this.removerFavorito();
    } else {
      this.adicionarFavorito();
    }
  }

  private adicionarFavorito() {
    this.favoritosService.adicionarFavorito(this.produto.id)
      .subscribe({
        next: (sucesso) => {
          if (sucesso) {
            this.isFavorito = true;
            this.notificacaoService.exibir('Produto adicionado aos favoritos!', 'success');
          } else {
            this.notificacaoService.exibir('Erro ao adicionar favorito', 'danger');
          }
        },
        error: (erro) => {
          console.error('Erro ao adicionar favorito:', erro);
          this.notificacaoService.exibir('Erro ao adicionar favorito', 'danger');
        },
        complete: () => {
          this.carregandoFavorito = false;
        }
      });
  }

  private removerFavorito() {
    this.favoritosService.removerFavorito(this.produto.id)
      .subscribe({
        next: (sucesso) => {
          if (sucesso) {
            this.isFavorito = false;
            this.notificacaoService.exibir('Produto removido dos favoritos!', 'success');
          } else {
            this.notificacaoService.exibir('Erro ao remover favorito', 'danger');
          }
        },
        error: (erro) => {
          console.error('Erro ao remover favorito:', erro);
          this.notificacaoService.exibir('Erro ao remover favorito', 'danger');
        },
        complete: () => {
          this.carregandoFavorito = false;
        }
      });
  }
}
