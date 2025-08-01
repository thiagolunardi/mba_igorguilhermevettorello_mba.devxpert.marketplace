import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ListaPaginada } from "../viewmodels/shared/lista-paginada.viewmodel";
import { catchError, map, of } from "rxjs";
import { ProdutoViewModel } from "../viewmodels/pesquisa-de-produtos/produto.viewmodel";
import { VendedorViewModel } from "../viewmodels/vendedor-detalhes/vendedor-viewmodel";

const URL_BASE = 'https://localhost:7179/api/vendedores/';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  private http = inject(HttpClient);

  public obterDadosdoVendedor(id: string) {
    const url = URL_BASE + id;

    return this.http.get<VendedorViewModel>(url, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
          else {
            throw new Error(`Erro ao buscar vendedor. Status: ${response.status}`);
          }
        }),
        catchError(() => of(null))
      );
  }

  public obterProdutosDoVendedor(id: string) {
    const url = URL_BASE + `${id}/produtos`;

    return this.http.get<ListaPaginada<ProdutoViewModel>>(url, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
          else {
            throw new Error(`Erro ao buscar produtos do vendedor. Status: ${response.status}`);
          }
        }),
        catchError(() => of(null))
      );
  }

}
