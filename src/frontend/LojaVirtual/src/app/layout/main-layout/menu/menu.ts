import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaViewModel } from '../../../viewmodels/pesquisa-de-produtos/categoria.viewmodel';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,   
    RouterModule 
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class Menu implements OnInit {

  public categorias: CategoriaViewModel[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.obterCategorias().subscribe({
      next: (dadosRecebidos) => {
        if (dadosRecebidos) {
            this.categorias = dadosRecebidos;
        }
      },
      error: (erro) => {
        console.error('Falha ao buscar categorias:', erro);
      }
    });
  }
}