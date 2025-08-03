import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Banco {
  _id: string;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  private apiUrl = 'http://localhost:4000/banco';

  constructor(private http: HttpClient) {}

  listarBancos(): Observable<Banco[]> {
    return this.http.get<Banco[]>(`${this.apiUrl}`);
  }
}
