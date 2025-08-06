import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ListaPaginada } from '../viewmodels/shared/lista-paginada.viewmodel';
import { adicionarParametrosSePossuirValor } from '../util/common-functions';
import { CategoriaViewModel } from '../viewmodels/pesquisa-de-produtos/categoria.viewmodel';
import { ProdutoViewModel } from '../viewmodels/pesquisa-de-produtos/produto.viewmodel';

export interface FavoritoViewModel {
  id: string;
  categoria: CategoriaViewModel;
  produtoId: string;
  produto: ProdutoViewModel
}

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private http = inject(HttpClient);
  private readonly URL_BASE = 'https://localhost:7179/api/favoritos/';

  obterFavoritos(
    numeroDaPagina: number | null = null,
    tamanhoDaPagina: number | null = null
  ) {
    const url = this.URL_BASE

    let params = new HttpParams();
    params = adicionarParametrosSePossuirValor(
      params,
      [
        { nome: 'numeroDaPagina', valor: numeroDaPagina },
        { nome: 'tamanhoDaPagina', valor: tamanhoDaPagina },
      ]);

    return this.http.get<ListaPaginada<FavoritoViewModel>>(url, { params, observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
          else {
            throw new Error(`Erro ao buscar favoritos. Status: ${response.status}`);
          }
        }),
        catchError(() => of(null))
      );
  }

  adicionarFavorito(produtoId: string) {
    const url = this.URL_BASE + produtoId;

    return this.http.post<any>(url, { observe: 'response' })  //TODO: alterar tipo de retorno de any p/ algo
      .pipe(
        map(response => {
          if (response.status === 201) {
            // return response.body;                          //TODO: verificar necessidade de retornar corpo do response
            return true;
          }
          else {
            throw new Error(`Erro ao adicionar favorito. Status: ${response.status}`);
          }
        }),
        catchError(() => of(false)),
      );
  }

  removerFavorito(produtoId: string) {
    const url = this.URL_BASE + produtoId;

    return this.http.delete<any>(url, { observe: 'response' })  //TODO: alterar tipo de retorno de any p/ algo
      .pipe(
        map(response => {
          if (response.status === 204) {
            // return response.body;                          //TODO: verificar necessidade de retornar corpo do response
            return true;
          }
          else {
            throw new Error(`Erro ao remover favorito. Status: ${response.status}`);
          }
        }),
        catchError(() => of(false)),
      );
  }
}
