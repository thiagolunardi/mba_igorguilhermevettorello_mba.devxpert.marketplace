import { Component, inject } from '@angular/core';
import { FavoritosService, FavoritoViewModel } from '../../../services/favoritos.service';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';
import { TAMANHO_PADRAO_PAGINA } from '../../../util/constantes';
import { ListaDeFavoritos } from "./lista-de-favoritos/lista-de-favoritos";
import { Observable } from 'rxjs';
import { Paginacao } from "../../../layout/shared/paginacao/paginacao";

@Component({
  selector: 'app-favoritos',
  imports: [ListaDeFavoritos, Paginacao],
  templateUrl: './favoritos.html',
  styles: ``
})
export class Favoritos {
  private favoritosService = inject(FavoritosService);

  carregando: boolean = true;
  listaPaginada$!: Observable<ListaPaginada<FavoritoViewModel> | null>;

  ngOnInit(): void {
    this.obterFavoritos(1, TAMANHO_PADRAO_PAGINA);
  }

  private obterFavoritos(
    numeroDaPagina: number | null = null,
    tamanhoDaPagina: number | null = null
  ) {
    this.listaPaginada$ = this.favoritosService.obterFavoritos(numeroDaPagina, tamanhoDaPagina);
  }

  trocarPagina(numeroDaPagina: number | null) {
    this.obterFavoritos(numeroDaPagina, TAMANHO_PADRAO_PAGINA);
  }
}
