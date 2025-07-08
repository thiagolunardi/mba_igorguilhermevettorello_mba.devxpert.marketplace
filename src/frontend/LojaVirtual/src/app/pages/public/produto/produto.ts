import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Produto } from '../../../services/produto';
import { DetalheProduto } from './components/detalhe-produto/detalhe-produto';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, DetalheProduto],
  templateUrl: './produto.html',
  styleUrls: ['./produto.scss'] 
})
export class ProdutoComponent implements OnInit {

  produto: Produto | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.produto = this.productService.getProdutoById(+id);
    }
  }
}