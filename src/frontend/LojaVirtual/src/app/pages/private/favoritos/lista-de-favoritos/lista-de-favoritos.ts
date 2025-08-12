import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListaPaginada } from '../../../../viewmodels/shared/lista-paginada.viewmodel';
import { FavoritosService, FavoritoViewModel } from '../../../../services/favoritos.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { IMAGEM_PLACEHOLDER } from '../../../../util/constantes';
import { NotificacaoService } from '../../../../services/notificacao.service';
import { CardFavorito } from "../card-favorito/card-favorito";

@Component({
  selector: 'app-lista-de-favoritos',
  imports: [NgbProgressbar, CardFavorito],
  templateUrl: './lista-de-favoritos.html',
  styles: ``
})
export class ListaDeFavoritos implements OnInit, OnChanges {
  router = inject(Router);
  favoritoService = inject(FavoritosService);
  notificacaoService = inject(NotificacaoService);
  carregando: boolean = true;
  listaPaginada!: ListaPaginada<FavoritoViewModel> | null;
  @Input() listaPaginada$!: Observable<ListaPaginada<FavoritoViewModel> | null>;

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaPaginada$'] && !changes['listaPaginada$'].firstChange) {
      this.carregarFavoritos();
    }
  }

  carregarFavoritos() {
    if (!this.listaPaginada$) return;
    this.carregando = true;
    this.listaPaginada$.subscribe({
      next: (resposta) => {
        this.listaPaginada = resposta;
      },
      error: (err) => {
        this.router.navigate(['/erro']);
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  remover(id: string) {
    this.favoritoService.removerFavorito(id)
      .subscribe({
        next: (resposta) => {
          if (!resposta) {
            this.notificacaoService.exibir("Erro ao remover favorito!");
            return;
          }

          this.notificacaoService.exibir("Favorito removido com sucesso!");
          this.carregarFavoritos();
        },
        error: (err) => {
          this.router.navigate(['/erro']);
        },
        complete: () => { }
      });
  }

  imagemSrc(src: string | undefined) {
    return src ? src : IMAGEM_PLACEHOLDER;
  }
}
