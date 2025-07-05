import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../../services/produtos.service';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';

@Component({
  selector: 'app-pesquisa-produtos',
  imports: [],
  templateUrl: './pesquisa-produtos.html',
  styles: ``
})
export class PesquisaProdutos implements OnInit {
  produtos: ProdutoViewModel[] = [];

  constructor(private produtoService: ProdutosService) {
    //TODO: obter rotas no construtor
  }

  ngOnInit(): void {
    this.produtos = this.produtoService.obterProdutos('');

    console.log(this.produtos);
  }

}
