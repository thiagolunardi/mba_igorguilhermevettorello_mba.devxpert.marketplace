import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListaPaginada } from '../../../../viewmodels/shared/lista-paginada.viewmodel';
import { FavoritoViewModel } from '../../../../services/favoritos.service';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';
import { IMAGEM_PLACEHOLDER } from '../../../../util/constantes';

@Component({
  selector: 'app-lista-de-favoritos',
  imports: [NgbProgressbar, RouterLink, CurrencyPipe],
  templateUrl: './lista-de-favoritos.html',
  styles: ``
})
export class ListaDeFavoritos implements OnInit, OnChanges {
  private router = inject(Router);
  carregando: boolean = true;
  listaPaginada!: ListaPaginada<FavoritoViewModel> | null;
  @Input() listaPaginada$!: Observable<ListaPaginada<FavoritoViewModel> | null>;

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaPaginada$'] && !changes['listaPaginada$'].firstChange) {
      this.carregarFavoritos();
    }
  }

  carregarFavoritos() {
    if (!this.listaPaginada$) return;
    this.carregando = true;
    this.listaPaginada$.subscribe({
      next: (resposta) => {
        this.listaPaginada = resposta;
      },
      error: (err) => {
        this.router.navigate(['/erro']);
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  imagemSrc(src: string | undefined) {
    return src ? src : IMAGEM_PLACEHOLDER;
  }
}
