import { Component } from '@angular/core';
import { NotificacaoService } from '../../../services/notificacao.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {

  constructor(private notificacaoService: NotificacaoService) {}

  exibirAvisoEmBreve() {
    this.notificacaoService.exibir('Página disponível em breve!', 'info'); 
  }
}