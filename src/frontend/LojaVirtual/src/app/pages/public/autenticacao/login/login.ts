import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]]
  });

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

    const credenciais = this.form.value as { email: string; senha: string };

    this.auth.login(credenciais).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => {
        this.error = 'Credenciais inválidas.';
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }
}
