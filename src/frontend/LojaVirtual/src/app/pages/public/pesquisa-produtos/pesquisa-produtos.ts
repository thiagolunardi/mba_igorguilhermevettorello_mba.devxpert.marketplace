import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../../services/produtos.service';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ResumoProduto } from "./resumo-produto/resumo-produto";
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';
import { FiltroPorCategoria } from "./filtro-por-categoria/filtro-por-categoria";

@Component({
  selector: 'app-pesquisa-produtos',
  imports: [NgbProgressbar, ResumoProduto, FiltroPorCategoria],
  templateUrl: './pesquisa-produtos.html',
  styles: ``
})
export class PesquisaProdutos implements OnInit {
  private produtoService = inject(ProdutosService);
  private activatedRoute = inject(ActivatedRoute);
  carregando: boolean = true;
  erro: boolean = false;
  listaDeProdutosPaginada?: ListaPaginada<ProdutoViewModel> | null;
  termo: string | null = null;
  categoriaId: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.termo = params['termo'];
      this.categoriaId = params['categoriaId'];
      this.obterProdutos(this.termo, this.categoriaId);
    });
  }

  obterProdutos(termo: string | null, categoriaId: string | null) {
    this.produtoService.obterProdutos(termo, categoriaId).subscribe({
      next: (resposta) => {
        this.listaDeProdutosPaginada = resposta;
        this.erro = false;
      },
      error: (err) => {
        this.erro = true;
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  filtrarPorCategoria(id: string) {
    this.categoriaId = id;
    this.obterProdutos(this.termo, this.categoriaId);
  }
}
