import { inject, Injectable } from "@angular/core";
import { ProdutoViewModel } from "../viewmodels/pesquisa-de-produtos/produto.viewmodel";
import { catchError, map, Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ListaPaginada } from "../viewmodels/shared/lista-paginada.viewmodel";
import { adicionarParametrosSePossuirValor } from "../util/common-functions";
import { ItemEmDestaqueViewModel } from "../pages/public/home/item-destaque/item-em-destaque.viewmodel";

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private http = inject(HttpClient);
  private readonly URL_BASE = 'https://localhost:7179/api/produtos/'

  public obterProdutos(
    termoPesquisado: string | null = null,
    categoriaId: string | null = null,
    numeroDaPagina: number | null = null,
    tamanhoDaPagina: number | null = null,
    orderBy: string | null = null
  ) {
    let url = this.URL_BASE;
    let params = new HttpParams();

    //adicionar parâmetros ao request somente se eles tiverem valor
    params = adicionarParametrosSePossuirValor(
      params,
      [
        { nome: 'termoPesquisado', valor: termoPesquisado },
        { nome: 'categoriaId', valor: categoriaId },
        { nome: 'numeroDaPagina', valor: numeroDaPagina },
        { nome: 'tamanhoDaPagina', valor: tamanhoDaPagina },
        { nome: 'orderBy', valor: orderBy }
      ]);

    return this.http.get<ListaPaginada<ProdutoViewModel>>(url, { params, observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
          else {
            throw new Error(`Erro ao buscar produtos. Status: ${response.status}`);
          }
        }),
        catchError(() => of(null)) // retorna null em caso de erro
      );
  }

  obterItensEmDestaque(): Observable<ItemEmDestaqueViewModel[] | null> {
    const url = this.URL_BASE + 'destaques';
    const params = new HttpParams().set('ordenarPor', 'dataCadastro').set('limit', 6);

    return this.http.get<ItemEmDestaqueViewModel[]>(url, {
      params: params,
      observe: 'response'
    })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
          else {
            throw new Error(`Erro ao buscar produtos. Status: ${response.status}`);
          }
        }),
        catchError(() => of(null))
      );
  }

  obterProdutoPorId(id: string): Observable<ProdutoViewModel | null> {
    const url = this.URL_BASE + id;

    return this.http.get<ProdutoViewModel>(url).pipe(
      catchError(error => {
        if (error.status === 404) {
          console.warn(`Produto com ID ${id} não encontrado. Retornando null.`);
        } else {
          console.error('Ocorreu um erro ao buscar o produto.', error);
        }

        return of(null);
      })
    );
  }

}
