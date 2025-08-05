import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { ItemEmDestaqueViewModel } from '../pages/public/home/item-destaque/item-em-destaque.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class ItensEmDestaqueService {

  private apiUrl = 'https://localhost:7179/api/produtos';

  constructor(private http: HttpClient) { }

  obterItensEmDestaque(): Observable<ItemEmDestaqueViewModel[] | null> {
    const params = new HttpParams().set('ordenarPor', 'dataCadastro').set('limit', 15);

    return this.http.get<ItemEmDestaqueViewModel[]>(this.apiUrl, { 
        params: params,
        observe: 'response' 
      })
      .pipe( 
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
          else {
            throw new Error(`Erro ao buscar produtos. Status: ${response.status}`);
          }
        }),
        catchError(() => of(null))
      );
  }
}