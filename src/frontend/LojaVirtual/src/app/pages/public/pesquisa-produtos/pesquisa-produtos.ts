import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../../services/produtos.service';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';
import { FiltroPorCategoria } from "./filtro-por-categoria/filtro-por-categoria";
import { ListaDeProdutos } from "./lista-de-produtos/lista-de-produtos";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pesquisa-produtos',
  imports: [FiltroPorCategoria, ListaDeProdutos],
  templateUrl: './pesquisa-produtos.html',
  styles: ``
})
export class PesquisaProdutos implements OnInit {
  private produtoService = inject(ProdutosService);
  private activatedRoute = inject(ActivatedRoute);
  termo: string | null = null;
  categoriaId: string | null = null;
  listaDeProdutos$!: Observable<ListaPaginada<ProdutoViewModel> | null>;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.termo = params['termo'];
      this.categoriaId = params['categoriaId'];
      this.obterProdutos(this.termo, this.categoriaId);
    });
  }

  obterProdutos(termo: string | null, categoriaId: string | null) {
    this.listaDeProdutos$ = this.produtoService.obterProdutos(termo, categoriaId);
  }

  filtrarPorCategoria(id: string) {
    this.categoriaId = id;
    this.obterProdutos(this.termo, this.categoriaId);
  }
}
