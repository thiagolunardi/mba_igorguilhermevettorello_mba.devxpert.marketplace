import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';
import { VendedorService } from '../../../services/vendedor.service';
import { VendedorViewModel } from '../../../viewmodels/vendedor-detalhes/vendedor-viewmodel';
import { DatePipe } from '@angular/common';
import { Paginacao } from '../../../layout/shared/paginacao/paginacao';
import { Observable } from 'rxjs';
import { ListaDeProdutosDoVendedor } from './lista-de-produtos-do-vendedor/lista-de-produtos-do-vendedor';
import { TAMANHO_PADRAO_PAGINA } from '../../../util/constantes';

@Component({
  selector: 'app-vendedor',
  imports: [DatePipe, Paginacao, ListaDeProdutosDoVendedor],
  templateUrl: './vendedor.html',
  styles: ``
})
export class Vendedor implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private vendedorService = inject(VendedorService);
  private router = inject(Router);

  id!: string;
  carregando: boolean = true;
  vendedor: VendedorViewModel | null = null;
  listaPaginada$!: Observable<ListaPaginada<ProdutoViewModel> | null>;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.obterDadosDoVendedor(this.id);
    this.obterProdutos(this.id);
  }

  private obterDadosDoVendedor(id: string) {
    this.vendedorService.obterDadosdoVendedor(id).subscribe({
      next: (vendedor) => {
        if (vendedor) {
          this.vendedor = vendedor;
        }
      },
      error: (err) => {
        this.router.navigate(['/erro']);
      },
      complete: () => {
        this.carregando = false;
      }
    })
  }

  private obterProdutos(
    id: string,
    numeroDaPagina: number | null = null,
    tamanhoDaPagina: number | null = null
  ) {
    this.listaPaginada$ = this.vendedorService.obterProdutosDoVendedor(id, numeroDaPagina, tamanhoDaPagina)
  }

  trocarPagina(numeroDaPagina: number | null) {
    this.obterProdutos(this.id, numeroDaPagina, TAMANHO_PADRAO_PAGINA);
  }
}
