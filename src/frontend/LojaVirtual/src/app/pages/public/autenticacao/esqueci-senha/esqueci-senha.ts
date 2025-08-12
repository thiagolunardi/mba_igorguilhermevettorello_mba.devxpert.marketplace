import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './esqueci-senha.html',
  styleUrls: ['./esqueci-senha.scss']
})
export class EsqueciSenha {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  error = '';
  success = '';
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
    this.success = '';

    const dados = this.form.value as { email: string };

    // Simular chamada para o serviço de esqueci senha
    // this.auth.esqueciSenha(dados).subscribe({
    //   next: () => {
    //     this.success = 'Link de redefinição enviado com sucesso!';
    //     this.loading = false;
    //   },
    //   error: () => {
    //     this.error = 'Erro ao enviar link de redefinição.';
    //     this.loading = false;
    //   },
    //   complete: () => this.loading = false
    // });

    // Simulação temporária
    setTimeout(() => {
      this.success = 'Link de redefinição enviado com sucesso! Verifique seu email.';
      this.loading = false;
    }, 2000);
  }
} 