import { Component, inject, OnInit } from '@angular/core';
import { CategoriaViewModel } from '../../../../viewmodels/pesquisa-de-produtos/categoria.viewmodel';
import { CategoriaService } from '../../../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filtro-por-categoria',
  imports: [],
  templateUrl: './filtro-por-categoria.html',
  styles: ``
})
export class FiltroPorCategoria implements OnInit {
  private router = inject(Router);
  private categoriaService = inject(CategoriaService);
  private activatedRoute = inject(ActivatedRoute);
  categorias!: CategoriaViewModel[];
  categoriaSelecionadaId: string = '';
  get termo() {
    return this.activatedRoute.snapshot.queryParams['termo'] || null;
  }

  ngOnInit(): void {
    this.categoriaService.obterCategorias().subscribe({
      next: (categorias) => {
        if (categorias) {
          this.categorias = categorias;
        }
        else {
          console.error('Erro ao carregar categorias');
        }
      },
      error: (error) => {
        console.error('Erro ao obter categorias:', error);
      }
    });
  }

  selecionarCategoria(id: string) {
    this.categoriaSelecionadaId = id;
    this.filtrar();
  }

  filtrar() {
    if (!this.categoriaSelecionadaId)
      return;

    this.router.navigate(
      ['/pesquisa'],
      {
        queryParams: { termo: this.termo, categoriaId: this.categoriaSelecionadaId }
      }
    );

    // window.location.reload();//TODO: remover após resolver o problema de recarregamento da página
  }
}
