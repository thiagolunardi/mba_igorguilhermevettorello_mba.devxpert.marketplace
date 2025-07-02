import { Component, Input, input } from '@angular/core';
import { ItemEmDestaqueViewModel } from './item-em-destaque.viewmodel';

@Component({
  selector: 'app-item-destaque',
  imports: [],
  templateUrl: './item-destaque.html',
  styles: ``
})
export class ItemDestaque {
  @Input() itemEmDestaque!: ItemEmDestaqueViewModel;
}
