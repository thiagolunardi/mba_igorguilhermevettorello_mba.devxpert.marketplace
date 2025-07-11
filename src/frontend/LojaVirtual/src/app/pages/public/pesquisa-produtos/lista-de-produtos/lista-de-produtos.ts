import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaPaginada } from '../../../../viewmodels/shared/lista-paginada.viewmodel';
import { ProdutoViewModel } from '../../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ResumoProduto } from '../resumo-produto/resumo-produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-de-produtos',
  imports: [NgbProgressbar, ResumoProduto,],
  templateUrl: './lista-de-produtos.html',
  styles: ``
})
export class ListaDeProdutos implements OnInit, OnChanges {
  private router = inject(Router);
  carregando: boolean = true;
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
      },
      error: (err) => {
        this.router.navigate(['/erro']);
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }
}
