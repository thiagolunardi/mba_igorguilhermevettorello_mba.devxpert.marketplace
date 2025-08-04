import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CadastroViewModel } from '../viewmodels/cadastro/cadastro.viewmodel';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'access_token';
  private readonly apiUrl = 'https://localhost:7179/api/conta';

  constructor(private http: HttpClient, private router: Router) { }

  login(data: { email: string; senha: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data)
      .pipe(tap(response => this.setToken(response.token)));
  }

  register(usuario: CadastroViewModel) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/registrar-cliente`, usuario)
      .pipe(tap(response => this.setToken(response.token)));
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
