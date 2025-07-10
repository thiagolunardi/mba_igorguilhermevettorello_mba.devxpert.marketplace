import { Component, inject, OnInit } from '@angular/core';
import { ProdutosService } from '../../../services/produtos.service';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';

@Component({
  selector: 'app-pesquisa-produtos',
  imports: [],
  templateUrl: './pesquisa-produtos.html',
  styles: ``
})
export class PesquisaProdutos implements OnInit {
  private produtoService = inject(ProdutosService);
  produtos: ProdutoViewModel[] = [];

  ngOnInit(): void {
    this.produtoService.obterProdutos(null, null).subscribe({
      // next: (response) => {
      //   this.produtos = response.produtos;
      //   console.log('Produtos obtidos:', this.produtos); // Log para verificar os produtos
      // },
      // error: (error) => {
      //   console.error('Erro ao obter produtos:', error);
      // }
    });

  }

}
