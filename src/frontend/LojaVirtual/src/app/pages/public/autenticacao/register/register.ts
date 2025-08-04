import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CadastroViewModel } from '../../../../viewmodels/cadastro/cadastro.viewmodel';
import { senhasIguaisValidator } from '../../../../util/common-functions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
    confirmacaoSenha: ['', Validators.required],
  }, { validators: senhasIguaisValidator() });

  error = '';

  onSubmit() {
    if (this.form.invalid)
      return;

    const cadastroViewModel = this.form.value as CadastroViewModel;
    this.auth.register(cadastroViewModel).subscribe(
      {
        next: () => this.router.navigate(['/home']),
        error: () => this.error = 'Erro no cadastro. Verifique os dados.'
      });
  }
}
