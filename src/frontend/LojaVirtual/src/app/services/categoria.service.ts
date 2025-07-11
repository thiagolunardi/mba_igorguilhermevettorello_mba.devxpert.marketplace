import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CategoriaViewModel } from "../viewmodels/pesquisa-de-produtos/categoria.viewmodel";
import { catchError, map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);

  public obterCategorias() {
    let url = 'https://localhost:7179/api/categorias';

    return this.http.get<CategoriaViewModel[]>(url, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
          else {
            throw new Error(`Erro ao buscar categorias. Status: ${response.status}`);
          }
        }),
        catchError(() => of(null)) // retorna null em caso de erro
      );
  }
}
