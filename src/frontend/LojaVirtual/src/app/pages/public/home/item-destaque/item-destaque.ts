import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemEmDestaqueViewModel } from './item-em-destaque.viewmodel';

@Component({
  selector: 'app-item-destaque',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './item-destaque.html',
  styleUrls: ['./item-destaque.scss']
})
export class ItemDestaque {
  @Input() itemEmDestaque!: ItemEmDestaqueViewModel;

}