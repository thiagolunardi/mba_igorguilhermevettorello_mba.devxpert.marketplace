import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  imports: [FormsModule],
  templateUrl: './pesquisa.html',
  styleUrls: ['./pesquisa.scss'],
  standalone: true
})
export class Pesquisa {
  private router = inject(Router);
  termo: string | null | undefined = ''; //termo é o texto digitado pelo usuário

  public pesquisar() {
    if (!this.termo)
      return;

    this.router.navigate(['/pesquisa'], {
      queryParams: { termo: this.termo }
    });
  }
}
