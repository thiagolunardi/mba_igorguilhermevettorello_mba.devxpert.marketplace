import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemEmDestaqueViewModel } from '../item-destaque/item-em-destaque.viewmodel';
import { IMAGEM_PLACEHOLDER } from '../../../../util/constantes';

@Component({
  selector: 'app-item-destaque',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './item-destaque.html',
  styleUrls: ['./item-destaque.scss']
})
export class ItemDestaqueComponent {
  @Input() item!: ItemEmDestaqueViewModel;

    get imagemSrc(): string {

    if (this.item?.imagem) {
      return `data:image/jpeg;base64,${this.item.imagem}`;
    }

    return IMAGEM_PLACEHOLDER;
  }
  
}