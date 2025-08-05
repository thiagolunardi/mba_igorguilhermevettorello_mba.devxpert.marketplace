import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ListaPaginada } from '../../../../viewmodels/shared/lista-paginada.viewmodel';
import { Observable } from 'rxjs';
import { ProdutoViewModel } from '../../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ResumoProduto } from '../../pesquisa-produtos/resumo-produto/resumo-produto';

@Component({
  selector: 'app-lista-de-produtos-do-vendedor',
  imports: [NgbProgressbar, ResumoProduto],
  templateUrl: './lista-de-produtos-do-vendedor.html',
  styles: ``
})
export class ListaDeProdutosDoVendedor {
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
    if (!this.listaDeProdutos$)
      return;

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
