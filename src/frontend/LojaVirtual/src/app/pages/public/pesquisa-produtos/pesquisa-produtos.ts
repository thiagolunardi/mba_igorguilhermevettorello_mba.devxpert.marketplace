import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../../services/produtos.service';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ResumoProduto } from "./resumo-produto/resumo-produto";
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';

@Component({
  selector: 'app-pesquisa-produtos',
  imports: [NgbProgressbar, ResumoProduto],
  templateUrl: './pesquisa-produtos.html',
  styles: ``
})
export class PesquisaProdutos implements OnInit {
  private produtoService = inject(ProdutosService);
  private activatedRoute = inject(ActivatedRoute);
  carregando: boolean = true;
  erro: boolean = false;
  listaDeProdutosPaginada?: ListaPaginada<ProdutoViewModel> | null;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const termo = params['termo'];

      this.obterProdutos(termo);
    });
  }

  obterProdutos(termo: string | null = null) {
    this.produtoService.obterProdutos(termo).subscribe({
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

}
