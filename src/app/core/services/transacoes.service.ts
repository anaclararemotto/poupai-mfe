import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface TotalData {
  totalReceitas?: number;
  totalDespesas?: number;
}

interface CategorizedData {
  _id: string;
  total: number;
}

interface PopulatedField {
  _id: string;
  nome: string;
}

export interface Transacao {
  _id: string;
  tipo: 'receita' | 'despesa' | 'transferencia';
  valor: number;
  data: string;
  categoria?: string | PopulatedField;
  bancoOrigem?: string | PopulatedField;
  bancoDestino?: string | PopulatedField;
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

  criarTransacao(payload: any) {
    return this.http.post(`${this.apiUrl}/transacoes`, payload);
  }

  excluirTransacao(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/transacoes/${id}`);
  }

  editarTransacao(
    id: string,
    transacaoAtualizada: Partial<NovaTransacao>
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/transacoes/${id}`,
      transacaoAtualizada
    );
  }

  getTotalReceitas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-receitas`);
  }

  getTotalDespesas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-despesas`);
  }

  getReceitasPorCategoriaMes(): Observable<CategorizedData[]> {
    return this.http.get<CategorizedData[]>(`${this.apiUrl}/receitas-mes`);
  }

  getDespesasPorCategoriaMes(): Observable<CategorizedData[]> {
    return this.http.get<CategorizedData[]>(`${this.apiUrl}/despesas-mes`);
  }
}
