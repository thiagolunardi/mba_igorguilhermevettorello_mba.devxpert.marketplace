import { Component, inject } from '@angular/core';
import { NotificacaoService } from '../../../services/notificacao.service';

@Component({
  selector: 'app-botao-favoritos',
  imports: [],
  templateUrl: './botao-favoritos.html',
  styles: ``
})
export class BotaoFavoritos {
  private notificacaoService = inject(NotificacaoService);

  adicionarFavorito() {
    this.notificacaoService.exibir(`Produto adicionado aos favoritos!`, 'success'); //TODO: remover
  }

  removerFavorito() {

  }

}
