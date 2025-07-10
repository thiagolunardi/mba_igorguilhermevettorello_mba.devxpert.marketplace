import { inject, Injectable } from "@angular/core";
import { ProdutoViewModel } from "../viewmodels/pesquisa-de-produtos/produto.viewmodel";
import { map } from "rxjs";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { ListaPaginada } from "../viewmodels/shared/lista-paginada.viewmodel";

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private http = inject(HttpClient);

  public obterProdutos(textoPesquisa: string | null, categoriaId: string | null): any {
    let url = 'https://localhost:7179/api/produtos/pesquisar';
    let params = new HttpParams();

    if (textoPesquisa)
      params = params.set('textoPesquisa', textoPesquisa);

    if (categoriaId)
      params = params.set('categoriaId', categoriaId);

    //TODO: passar demais parametros p/ o request

    return this.http.get<ListaPaginada<ProdutoViewModel>>(url, { params, observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            response.body;
          }
          else {
            throw new Error(`Erro ao buscar produtos. Status: ${response.status}`);
          }
        })
      );
  }

  //método TEMPORÁRIO para simular a obtenção de produtos
  private mockarProdutos(): ProdutoViewModel[] {
    const produtos: ProdutoViewModel[] = [];

    for (let i = 1; i <= 20; i++) {
      const produto: ProdutoViewModel = {
        nome: `Produto ${i}`,
        descricao: `Descrição do produto ${i}`,
        imagem: 'https://via.placeholder.com/150',
        preco: (i) * 100,
        estoque: (i) * 10,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      produtos.push(produto);
    }

    return produtos;
  }
}
