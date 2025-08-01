import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../../services/produtos.service';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';
import { FiltroPorCategoria } from "./filtro-por-categoria/filtro-por-categoria";
import { ListaDeProdutos } from "./lista-de-produtos/lista-de-produtos";
import { Observable } from 'rxjs';
import { TAMANHO_PADRAO_PAGINA } from '../../../util/constantes';
import { Paginacao } from '../../../layout/shared/paginacao/paginacao';

@Component({
  selector: 'app-pesquisa-produtos',
  imports: [FiltroPorCategoria, ListaDeProdutos, Paginacao],
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
      this.obterProdutos(this.termo, this.categoriaId, 1, TAMANHO_PADRAO_PAGINA);
    });
  }

  obterProdutos(
    termo: string | null,
    categoriaId: string | null,
    numeroDaPagina: number | null = null,
    tamanhoDaPagina: number | null = null,
    orderBy: string | null = null
  ) {
    this.listaDeProdutos$ = this.produtoService.obterProdutos(termo, categoriaId, numeroDaPagina, tamanhoDaPagina, orderBy);
  }

  filtrarPorCategoria(id: string | null) {
    this.categoriaId = id;
    this.obterProdutos(this.termo, this.categoriaId);
  }

  trocarPagina(numeroDaPagina: number | null) {
    this.obterProdutos(this.termo, this.categoriaId, numeroDaPagina, TAMANHO_PADRAO_PAGINA);
  }
}
