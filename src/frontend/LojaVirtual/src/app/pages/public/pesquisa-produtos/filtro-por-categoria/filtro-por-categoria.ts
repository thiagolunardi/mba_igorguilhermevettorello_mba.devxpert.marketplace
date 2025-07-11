import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
  private categoriaService = inject(CategoriaService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  categorias!: CategoriaViewModel[];
  @Input() categoriaSelecionadaId: string | null = '';
  @Output() filtrarPorCategoria = new EventEmitter<string>();

  get termo() {
    return this.activatedRoute.snapshot.queryParams['termo'] || null;
  }

  ngOnInit(): void {
    this.obterCategorias();
  }

  private obterCategorias() {
    this.categoriaService.obterCategorias()
      .subscribe({
        next: (categorias) => {
          if (categorias) {
            this.categorias = categorias;
          }
          else {
            console.error('Erro ao carregar categorias');
          }
        },
        error: (err) => {
          this.router.navigate(['/erro']);
        }
      });
  }

  selecionarCategoria(id: string) {
    this.categoriaSelecionadaId = id;
    this.filtrarPorCategoria.emit(id);
  }
}
