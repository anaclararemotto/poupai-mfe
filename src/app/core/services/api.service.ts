import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:4000';

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transacoes`);
  }

  getBanks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/banco`);
  }
}
