import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs'; // 1. Importar 'of' e 'catchError'
import { catchError, } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ItemEmDestaqueViewModel } from '../pages/public/home/item-destaque/item-em-destaque.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class ItensEmDestaqueService {

  private apiUrl = 'https://localhost:7179/api/marketplace/produtos';

  constructor(private http: HttpClient) { }

  obterItensEmDestaque() {
    return this.http.get<ItemEmDestaqueViewModel[]>(this.apiUrl, { observe: 'response' })
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