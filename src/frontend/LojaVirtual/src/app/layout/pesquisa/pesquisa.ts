import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  imports: [FormsModule],
  templateUrl: './pesquisa.html',
  standalone: true
})
export class Pesquisa {
  textoPesquisado: string | null | undefined = '';

  constructor(private router: Router) { }

  public pesquisar() {
    if (!this.textoPesquisado)
      return;

    this.router.navigate(['/Pesquisa', this.textoPesquisado]);
  }
}
