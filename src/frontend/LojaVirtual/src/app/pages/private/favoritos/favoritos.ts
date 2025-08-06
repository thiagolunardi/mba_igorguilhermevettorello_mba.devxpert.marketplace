import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritosService, FavoritoViewModel } from '../../../services/favoritos.service';
import { Observable } from 'rxjs';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';

@Component({
  selector: 'app-favoritos',
  imports: [],
  templateUrl: './favoritos.html',
  styles: ``
})
export class Favoritos {
  private activatedRoute = inject(ActivatedRoute);
  private favoritosService = inject(FavoritosService);
  private router = inject(Router);

  id!: string;
  carregando: boolean = true;
  listaPaginada$!: Observable<ListaPaginada<FavoritoViewModel> | null>;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.obterProdutos(this.id);
  }

  // private obterProdutos(
  //   id: string,
  //   numeroDaPagina: number | null = null,
  //   tamanhoDaPagina: number | null = null
  // ) {
  //   this.listaPaginada$ = this.favoritosService.obterFavoritos(id, numeroDaPagina, tamanhoDaPagina)
  // }

  // trocarPagina(numeroDaPagina: number | null) {
  //   this.obterProdutos(this.id, numeroDaPagina, TAMANHO_PADRAO_PAGINA);
  // }
}
