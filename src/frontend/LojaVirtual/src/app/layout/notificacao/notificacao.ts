import { Component, inject } from '@angular/core';
import { NotificacaoService } from '../../services/notificacao.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notificacao',
  imports: [NgbToast],
  templateUrl: './notificacao.html',
  styles: ``
})
export class Notificacao {
  notificacaoService = inject(NotificacaoService);
}
