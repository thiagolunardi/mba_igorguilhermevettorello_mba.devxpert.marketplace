import { Component, OnInit } from '@angular/core';
import { ItensEmDestaqueService } from '../../../services/itens-em-destaque.service';
import { ItemDestaque } from "../item-destaque/item-destaque";
import { ItemEmDestaqueViewModel } from '../item-destaque/item-em-destaque.viewmodel';

@Component({
  selector: 'app-destaque',
  imports: [ItemDestaque],
  templateUrl: './destaque.html',
  styles: ``
})
export class Destaque implements OnInit {
  itensEmDestaque: ItemEmDestaqueViewModel[] = [];

  constructor(private itensEmDestaqueService: ItensEmDestaqueService) { }

  ngOnInit(): void {
    this.itensEmDestaque = this.itensEmDestaqueService.obterItensEmDestaque();
  }
}
