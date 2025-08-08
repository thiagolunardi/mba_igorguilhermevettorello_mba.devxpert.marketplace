import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ItemEmDestaqueViewModel } from '../item-destaque/item-em-destaque.viewmodel';
import { ItemDestaqueComponent } from '../item-destaque/item-destaque';
import { ProdutosService } from '../../../../services/produtos.service';

@Component({
  selector: 'app-destaque',
  standalone: true,
  imports: [CommonModule, ItemDestaqueComponent],
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
