import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ItemEmDestaqueViewModel } from '../item-destaque/item-em-destaque.viewmodel';
import { ItensEmDestaqueService } from '../../../../services/itens-em-destaque.service';
import { ItemDestaqueComponent } from '../item-destaque/item-destaque';

@Component({
  selector: 'app-destaque',
  standalone: true,
  imports: [CommonModule, ItemDestaqueComponent],
  templateUrl: './destaque.html',
  styleUrls: ['./destaque.scss']
})
export class DestaqueComponent implements OnInit {
  
  public itensEmDestaque$!: Observable<ItemEmDestaqueViewModel[]>;

  constructor(private itensEmDestaqueService: ItensEmDestaqueService) {}

  ngOnInit(): void {
    this.itensEmDestaque$ = this.itensEmDestaqueService.obterItensEmDestaque();
  }
}