import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ResumoProduto } from '../pesquisa-produtos/resumo-produto/resumo-produto';
import { VendedorService } from '../../../services/vendedor.service';
import { VendedorViewModel } from '../../../viewmodels/vendedor-detalhes/vendedor-viewmodel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vendedor',
  imports: [NgbProgressbar, ResumoProduto, DatePipe],
  templateUrl: './vendedor.html',
  styles: ``
})
export class VendedorComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private vendedorService = inject(VendedorService);
  private router = inject(Router);

  carregando: boolean = true;
  vendedor!: VendedorViewModel;
  listaPaginada!: ListaPaginada<ProdutoViewModel> | null;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    this.obterDadosDoVendedor(id);
    this.obterProdutos(id);
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

  private obterProdutos(id: string) {
    this.carregando = true;

    this.vendedorService.obterProdutosDoVendedor(id).subscribe({
      next: (resposta) => {
        if (resposta) {
          this.listaPaginada = resposta;
        }
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
