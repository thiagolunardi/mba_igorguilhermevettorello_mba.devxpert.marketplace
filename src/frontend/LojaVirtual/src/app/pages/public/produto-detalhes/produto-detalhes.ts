import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InfoProdutoComponent } from './components/info-produto/info-produto';
import { ProdutoViewModel } from '../../../viewmodels/pesquisa-de-produtos/produto.viewmodel';
import { ProdutosService } from '../../../services/produtos.service';

@Component({
  selector: 'app-produto-detalhes',
  standalone: true,
  imports: [CommonModule, InfoProdutoComponent],
  templateUrl: './produto-detalhes.html',
  styleUrls: ['./produto-detalhes.scss']
})
export class ProdutoDetalhesComponent implements OnInit {
  route = inject(ActivatedRoute);
  produtoService = inject(ProdutosService);

  produto$!: Observable<ProdutoViewModel | null>;

  ngOnInit(): void {
    this.produto$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.produtoService.obterProdutoPorId(id);
        }
        return of(null);
      })
    );
  }
}
