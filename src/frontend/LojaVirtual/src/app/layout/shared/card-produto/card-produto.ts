import { Component, Input } from '@angular/core';
import { IMAGEM_PLACEHOLDER } from '../../../util/constantes';
import { ItemEmDestaqueViewModel } from '../../../pages/public/home/item-destaque/item-em-destaque.viewmodel';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-produto',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card-produto.html',
  styleUrls: ['./card-produto.scss']
})
export class CardProduto {
  @Input() produto!: ItemEmDestaqueViewModel;
  @Input() exibirBadge: boolean = false;

  get imagemSrc(): string {
    return this.produto?.src ? this.produto.src : IMAGEM_PLACEHOLDER;
  }
}

