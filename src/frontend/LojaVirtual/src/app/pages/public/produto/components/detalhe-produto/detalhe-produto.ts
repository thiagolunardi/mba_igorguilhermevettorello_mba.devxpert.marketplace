import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe-produto.html',
  styleUrls: ['./detalhe-produto.scss']
})
export class DetalheProduto {
  @Input() produto: any;
}
