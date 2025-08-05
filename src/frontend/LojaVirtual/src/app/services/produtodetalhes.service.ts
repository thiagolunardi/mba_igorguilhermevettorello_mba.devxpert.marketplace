import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProdutoViewModel } from './produto.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class ProdutoDetalhesService {
  private apiUrl = 'https://localhost:7179/api/produtos';

  constructor(private http: HttpClient) { }

  getProdutoById(id: string): Observable<ProdutoViewModel | null> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<ProdutoViewModel>(url).pipe(
      catchError(error => {
        if (error.status === 404) {
          console.warn(`Produto com ID ${id} não encontrado. Retornando null.`);
        } else {
          console.error('Ocorreu um erro ao buscar o produto.', error);
        }

        return of(null);
      })
    );
  }

}
