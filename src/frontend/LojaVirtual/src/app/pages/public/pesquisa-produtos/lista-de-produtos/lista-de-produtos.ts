import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaPaginada } from '../../../../viewmodels/shared/lista-paginada.viewmodel';
import { ProdutoViewModel } from '../../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ResumoProduto } from '../resumo-produto/resumo-produto';

@Component({
  selector: 'app-lista-de-produtos',
  imports: [NgbProgressbar, ResumoProduto,],
  templateUrl: './lista-de-produtos.html',
  styles: ``
})
export class ListaDeProdutos implements OnInit, OnChanges {
  carregando: boolean = true;
  erro: boolean = false;
  produtos!: ListaPaginada<ProdutoViewModel> | null;
  @Input() listaDeProdutos$!: Observable<ListaPaginada<ProdutoViewModel> | null>;

  ngOnInit(): void {
    this.carregarProdutos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaDeProdutos$'] && !changes['listaDeProdutos$'].firstChange) {
      this.carregarProdutos();
    }
  }

  carregarProdutos() {
    if (!this.listaDeProdutos$) return;
    this.carregando = true;
    this.listaDeProdutos$.subscribe({
      next: (resposta) => {
        this.produtos = resposta;
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
