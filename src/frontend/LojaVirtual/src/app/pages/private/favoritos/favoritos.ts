import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FavoritosService, FavoritoViewModel } from '../../../services/favoritos.service';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';
import { IMAGEM_PLACEHOLDER, TAMANHO_PADRAO_PAGINA } from '../../../util/constantes';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  imports: [NgbProgressbar, RouterLink, CurrencyPipe],
  templateUrl: './favoritos.html',
  styles: ``
})
export class Favoritos {
  private favoritosService = inject(FavoritosService);
  private router = inject(Router);

  carregando: boolean = true;
  listaPaginada!: ListaPaginada<FavoritoViewModel> | null;

  ngOnInit(): void {
    this.obterFavoritos(1, TAMANHO_PADRAO_PAGINA);
  }

  private obterFavoritos(
    numeroDaPagina: number | null = null,
    tamanhoDaPagina: number | null = null
  ) {
    this.favoritosService.obterFavoritos(numeroDaPagina, tamanhoDaPagina)
      .subscribe({
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

  trocarPagina(numeroDaPagina: number | null) {
    this.obterFavoritos(numeroDaPagina, TAMANHO_PADRAO_PAGINA);
  }

  imagemSrc(src: string | undefined) {
    return src ? src : IMAGEM_PLACEHOLDER;
  }
}
