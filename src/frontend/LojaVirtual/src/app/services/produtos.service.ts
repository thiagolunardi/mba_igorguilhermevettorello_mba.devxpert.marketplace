import { Injectable } from "@angular/core";
import { ProdutoViewModel } from "../viewmodels/pesquisa-de-produtos/produto.viewmodel";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  constructor(private router: Router) { }

  public obterProdutos(textoPesquisa: string): ProdutoViewModel[] {
    return this.mockarProdutos();
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
