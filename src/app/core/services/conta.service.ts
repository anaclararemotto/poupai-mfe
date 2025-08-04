import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Conta {
  _id: string;
  saldo: string;
  usuário: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private apiUrl = 'http://localhost:4000/conta';

  constructor(private http: HttpClient) {}

  getContaDoUsuario(): Observable<Conta> {
    return this.http.get<Conta>(`${this.apiUrl}/minha`);
  }
}
