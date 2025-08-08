import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ListaPaginada } from '../viewmodels/shared/lista-paginada.viewmodel';
import { adicionarParametrosSePossuirValor } from '../util/common-functions';
import { ProdutoViewModel } from '../viewmodels/pesquisa-de-produtos/produto.viewmodel';

export interface FavoritoViewModel {
  id: string;
  produtoId: string;
  produto: ProdutoViewModel
}

export interface ApiResponse {
  success: boolean;
  message?: string;
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

  adicionarFavorito(produtoId: string): Observable<ApiResponse> {
    const url = this.URL_BASE + produtoId;

    return this.http.post<any>(url, {}).pipe(
      map(() => ({
        success: true,
        message: 'Produto adicionado aos favoritos!'
      })),
      catchError((error: HttpErrorResponse) => { 
        return of({
          success: false,
          message: error.error || 'Ocorreu um erro ao adicionar.'
        });
      })
    );
  }

  removerFavorito(produtoId: string): Observable<ApiResponse> {
    const url = this.URL_BASE + produtoId;

    return this.http.delete(url).pipe(
      map(() => ({
        success: true,
        message: 'Produto removido dos favoritos.'
      })),
      catchError((error: HttpErrorResponse) => {
        return of({
          success: false,
          message: error.error || 'Ocorreu um erro ao remover.'
        });
      })
    );
  }

  verificarSeFavorito(produtoId: string): Observable<boolean> {
    const url = `${this.URL_BASE}verificar/${produtoId}`;
    return this.http.get<boolean>(url).pipe(
      catchError(() => of(false))
    );
  }
}
