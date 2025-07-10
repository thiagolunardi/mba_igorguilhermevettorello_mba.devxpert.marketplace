import { Component, inject, OnInit } from '@angular/core';
import { ProdutosService } from '../../../services/produtos.service';
import { AsyncPipe } from '@angular/common';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ResumoProduto } from "./resumo-produto/resumo-produto";
import { ActivatedRoute } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';

@Component({
  selector: 'app-pesquisa-produtos',
  imports: [AsyncPipe, NgbProgressbar, ResumoProduto],
  templateUrl: './pesquisa-produtos.html',
  styles: ``
})
export class PesquisaProdutos implements OnInit {
  private produtoService = inject(ProdutosService);
  private activatedRoute = inject(ActivatedRoute);

  produtos$!: Observable<ListaPaginada<ProdutoViewModel> | null>;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const termo = params['termo'];

      this.produtos$ = this.produtoService.obterProdutos(termo);
    });
  }
}
