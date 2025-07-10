import { inject, Injectable } from "@angular/core";
import { ProdutoViewModel } from "../viewmodels/pesquisa-de-produtos/produto.viewmodel";
import { map, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ListaPaginada } from "../viewmodels/shared/lista-paginada.viewmodel";

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

    if (termoPesquisado)
      params = params.set('termoPesquisado', termoPesquisado);

    if (categoriaId)
      params = params.set('categoriaId', categoriaId);

    if (numeroDaPagina)
      params = params.set('numeroDaPagina', numeroDaPagina);

    if (tamanhoDaPagina)
      params = params.set('tamanhoDaPagina', tamanhoDaPagina);

    if (orderBy)
      params = params.set('orderBy', orderBy);

    return this.http.get<ListaPaginada<ProdutoViewModel>>(url, { params, observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
          else {
            throw new Error(`Erro ao buscar produtos. Status: ${response.status}`);
          }
        })
      );
  }
}
