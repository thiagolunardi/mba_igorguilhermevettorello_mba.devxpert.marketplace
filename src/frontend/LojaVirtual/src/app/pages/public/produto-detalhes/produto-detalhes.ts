import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProdutoDetalhesService } from '../../../services/produtodetalhes.service';
import { ProdutoViewModel } from '../../../services/produto.viewmodel';
import { InfoProdutoComponent } from './components/info-produto/info-produto';

@Component({
  selector: 'app-produto-detalhes',
  standalone: true,
  imports: [CommonModule, InfoProdutoComponent],
  templateUrl: './produto-detalhes.html',
  styleUrls: ['./produto-detalhes.scss']
})
export class ProdutoDetalhesComponent implements OnInit {
  
  produto$!: Observable<ProdutoViewModel | null>;

  constructor(
    private route: ActivatedRoute,
    private produtoDetalhesService: ProdutoDetalhesService
  ) {}

  ngOnInit(): void {
    this.produto$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.produtoDetalhesService.getProdutoById(id);
        }
        return of(null);
      })
    );
  }
}