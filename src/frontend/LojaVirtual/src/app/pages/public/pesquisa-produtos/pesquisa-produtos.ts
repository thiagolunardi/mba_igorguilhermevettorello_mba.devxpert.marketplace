import { Component, inject, OnInit } from '@angular/core';
import { ProdutosService } from '../../../services/produtos.service';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';

@Component({
  selector: 'app-pesquisa-produtos',
  imports: [],
  templateUrl: './pesquisa-produtos.html',
  styles: ``
})
export class PesquisaProdutos implements OnInit {
  private produtoService = inject(ProdutosService);

  listaPaginada: ListaPaginada<ProdutoViewModel> | null = null;

  get produtos(): ProdutoViewModel[] {
    return this.listaPaginada ? this.listaPaginada.itens : [];
  }

  ngOnInit(): void {
    this.produtoService.obterProdutos()
      .subscribe({
        next: (response) => {
          this.listaPaginada = response;
        },
        error: (error: any) => {
          console.error('Erro ao obter produtos:', error);
        }
      });
  }

}
