import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { senhaForteValidator, senhasIguaisValidator } from '../../../../util/common-functions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [
      Validators.required,
      senhaForteValidator()
    ]],
    confirmacaoSenha: ['', Validators.required],
  }, { validators: senhasIguaisValidator() });

  error = '';
  loading = false;

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const cadastro = this.form.value as {
      nome: string;
      email: string;
      senha: string;
      confirmacaoSenha: string;
    };

    this.auth.register(cadastro).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => {
        this.error = 'Erro no cadastro. Verifique os dados.';
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }
}

