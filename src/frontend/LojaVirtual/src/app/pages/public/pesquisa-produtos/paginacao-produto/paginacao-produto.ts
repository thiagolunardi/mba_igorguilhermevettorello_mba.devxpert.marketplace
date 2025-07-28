import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaPaginada } from '../../../../viewmodels/shared/lista-paginada.viewmodel';
import { NotificacaoService } from '../../../../services/notificacao.service';

@Component({
  selector: 'app-paginacao-produto',
  imports: [],
  templateUrl: './paginacao-produto.html',
  styles: ``
})
export class PaginacaoProduto implements OnInit {
  notificacaoService = inject(NotificacaoService);
  @Input() listaPaginada$!: Observable<ListaPaginada<any> | null>;
  paginacao!: ListaPaginada<any> | null;

  ngOnInit(): void {
    this.carregarPaginacao();
  }

  get habilitarPrimeraPagina(): boolean {
    return this.paginacao ? this.paginacao.paginaAtual > 1 : false;
  }

  get habilitarUltimaPagina(): boolean {
    return this.paginacao ? this.paginacao.temProximaPagina : false;
  }

  get proximaPagina(): number | null {
    return this.paginacao && this.paginacao.temProximaPagina ? this.paginacao.paginaAtual + 1 : null;
  }

  get paginaAnterior(): number | null {
    return this.paginacao && this.paginacao.temPaginaAnterior ? this.paginacao.paginaAtual - 1 : null;
  }

  carregarPaginacao() {
    this.listaPaginada$.subscribe({
      next: (resposta) => {
        this.paginacao = resposta;

        console.warn(this.paginacao)
      },
      error: (err) => {
        this.notificacaoService.exibir('Erro ao carregar a paginação!');
      },
      complete: () => { }
    });
  }

}
