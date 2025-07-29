import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FavoritosService } from '../../../services/favoritos.service';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../../services/produtos.service';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './favoritos.html',
  styleUrls: ['./favoritos.scss']
})

export class Favoritos implements OnInit, OnChanges {

  constructor(private favoritosService: FavoritosService) {}

  private produtoService = inject(ProdutosService);
  private activatedRoute = inject(ActivatedRoute);

  termo: string | null = null;
  categoriaId: string | null = null;

  private router = inject(Router);
  produtos!: ListaPaginada<ProdutoViewModel> | null;

  listaDeProdutos$!: Observable<ListaPaginada<ProdutoViewModel> | null>;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.termo = params['termo'];
      this.categoriaId = params['categoriaId'];
      this.obterProdutos(this.termo, this.categoriaId);
      this.carregarProdutos();
    });
  }

  obterProdutos(termo: string | null, categoriaId: string | null) {
    this.listaDeProdutos$ = this.produtoService.obterProdutos(termo, categoriaId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaDeProdutos$'] && !changes['listaDeProdutos$'].firstChange) {
      this.carregarProdutos();
    }
  }

  carregarProdutos() {
    if (!this.listaDeProdutos$) return;
    this.listaDeProdutos$.subscribe({
      next: (resposta) => {
        this.produtos = resposta;
      },
      error: (err) => {
        this.router.navigate(['/erro']);
      },
    });
  }

  // adicionarFavorito(produto: ItemEmDestaqueViewModel) {
  //   this.favoritosService.adicionarFavorito(produto);
  // }

  // removerFavorito(produto: ItemEmDestaqueViewModel) {
  //   this.favoritosService.removerFavorito(produto);
  // }

  // trackById(index: number, item: ItemEmDestaqueViewModel): number {
  // return item.id;
  // }
}
