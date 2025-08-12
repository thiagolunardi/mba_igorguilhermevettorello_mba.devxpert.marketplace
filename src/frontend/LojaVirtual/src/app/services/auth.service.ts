import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CadastroViewModel } from '../viewmodels/cadastro/cadastro.viewmodel';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'access_token';
  private readonly URL_BASE = 'https://localhost:7179/api/clientes';

  constructor(private http: HttpClient, private router: Router) { }

  login(data: { email: string; senha: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.URL_BASE}/login`, data)
      .pipe(
        tap({
          next: response => this.setToken(response.token),
          error: err => console.error('Erro de login:', err)
        })
      );
  }

  register(usuario: CadastroViewModel) {
    return this.http.post<{ token: string }>(this.URL_BASE, usuario)
      .pipe(tap(response => this.setToken(response.token)));
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      const now = Date.now() / 1000; // em segundos
      return exp > now;
    } catch {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getUsuario(): Usuario | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<any>(token);

      return {
        id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        nome: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        roles: Array.isArray(decoded['role']) ? decoded['role'] : [decoded['role']],
      };
    } catch {
      return null;
    }
  }
}

export interface JwtPayload {
  nome: string;
  email: string;
  exp: number;
}

export interface Usuario {
  id: string;
  email: string;
  nome: string;
  roles: string[];
}
