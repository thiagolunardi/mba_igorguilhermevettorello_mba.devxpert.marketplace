import { Component, inject, OnInit } from '@angular/core';
import { ProdutosService } from '../../../services/produtos.service';
import { AsyncPipe } from '@angular/common';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pesquisa-produtos',
  imports: [AsyncPipe, NgbProgressbar],
  templateUrl: './pesquisa-produtos.html',
  styles: ``
})
export class PesquisaProdutos implements OnInit {
  private produtoService = inject(ProdutosService);
  produtos$ = this.produtoService.obterProdutos();

  ngOnInit(): void { }
}
