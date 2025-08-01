import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificacaoService } from '../../../services/notificacao.service';
import { ListaPaginada } from '../../../viewmodels/shared/lista-paginada.viewmodel';


@Component({
  selector: 'app-paginacao-produto',
  imports: [],
  templateUrl: './paginacao.html',
  styles: ``
})
export class Paginacao implements OnInit {
  notificacaoService = inject(NotificacaoService);
  paginacao!: ListaPaginada<any> | null;
  @Input() listaPaginada$!: Observable<ListaPaginada<any> | null>;
  @Output() trocarPagina = new EventEmitter<number | null>();

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
      },
      error: (err) => {
        this.notificacaoService.exibir('Erro ao carregar a paginação!');
      },
      complete: () => { }
    });
  }

  navegarParaPagina(numeroDaPagina: number | null) {
    if (numeroDaPagina) {
      this.trocarPagina.emit(numeroDaPagina);
    } else {
      this.notificacaoService.exibir('Número de página inválido!');
    }
  }
}
