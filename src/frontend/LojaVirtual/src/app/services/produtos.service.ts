import { inject, Injectable } from "@angular/core";
import { ProdutoViewModel } from "../viewmodels/pesquisa-de-produtos/produto.viewmodel";
import { catchError, map, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ListaPaginada } from "../viewmodels/shared/lista-paginada.viewmodel";
import { adicionarParametrosSePossuirValor } from "../util/common-functions";

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private http = inject(HttpClient);

  public obterProdutos(
    termoPesquisado: string | null = null,
    categoriaId: string | null = null,
    numeroDaPagina: number | null = null,
    tamanhoDaPagina: number | null = null,
    orderBy: string | null = null
  ) {
    let url = 'https://localhost:7179/api/produtos/pesquisar';
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
}
