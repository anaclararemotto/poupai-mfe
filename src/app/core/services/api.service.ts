import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transacoes`);
  }

  getBanks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/banco`);
  }

  getCategories() {
    return this.http.get<any[]>('/categorias');
  }
}
