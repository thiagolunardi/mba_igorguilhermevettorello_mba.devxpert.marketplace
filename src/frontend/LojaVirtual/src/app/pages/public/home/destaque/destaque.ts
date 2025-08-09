import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ItemEmDestaqueViewModel } from '../item-destaque/item-em-destaque.viewmodel';
import { ProdutosService } from '../../../../services/produtos.service';
import { CardProduto } from '../../../../layout/shared/card-produto/card-produto';

@Component({
  selector: 'app-destaque',
  standalone: true,
  imports: [CommonModule, CardProduto],
  templateUrl: './destaque.html',
  styleUrls: ['./destaque.scss']
})
export class DestaqueComponent implements OnInit {
  produtoService = inject(ProdutosService);
  public itensEmDestaque$!: Observable<ItemEmDestaqueViewModel[] | null>;

  ngOnInit(): void {
    this.itensEmDestaque$ = this.produtoService.obterItensEmDestaque();
  }
}
