import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface TotalResponse {
  totalReceitas?: number;
  totalDespesas?: number;
}

export interface Transacao {
  _id: string;
  tipo: 'receita' | 'despesa' | 'transferencia';
  valor: number;
  data: string;
  categoria?: string;
  bancoOrigem?: any;
  bancoDestino?: any;
  conta: string;
}

export interface NovaTransacao {
  tipo: 'receita' | 'despesa' | 'transferencia';
  valor: number;
  data: string;
  categoria?: string;
  bancoOrigem?: string;
  bancoDestino?: string;
  conta: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransacoesService {
  private apiUrl = 'http://localhost:4000/transacao';

  constructor(private http: HttpClient) {}

  listarTransacoes(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.apiUrl}/transacoes`);
  }

  criarTransacao(transacao: NovaTransacao): Observable<any> {
    return this.http.post(`${this.apiUrl}/transacoes`, transacao);
  }

  getTotalReceitas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-receitas`);
  }

  getTotalDespesas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-despesas`);
  }

  excluirTransacao(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/transacoes/${id}`);
  }
}
