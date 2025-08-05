import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-autenticacao',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './autenticacao.html'
})
export class Autenticacao {
  public auth = inject(AuthService);
  router = inject(Router);
  readonly usuario = this.auth.getUsuario();

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
