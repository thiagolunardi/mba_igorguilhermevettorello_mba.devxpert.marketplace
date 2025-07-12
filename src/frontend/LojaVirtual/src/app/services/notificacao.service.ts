import { Injectable } from "@angular/core";

export interface Notificacao {
  texto: string;
  tipo?: 'success' | 'danger' | 'info' | 'warning';
  delay: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  notificacoes: Notificacao[] = [];

  exibir(texto: string, tipo: Notificacao['tipo'] = 'info', delay: number = 3000) {
    this.notificacoes.push({ texto, tipo, delay });
  }

  remover(notificacao: Notificacao) {
    this.notificacoes = this.notificacoes.filter(t => t !== notificacao);
  }
}
