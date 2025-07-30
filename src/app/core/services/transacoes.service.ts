import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:4000/transacoes';

  constructor(private http: HttpClient) {}

 
  listarTransacoes(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.apiUrl);
  }

 
  criarTransacao(transacao: NovaTransacao): Observable<any> {
    return this.http.post(this.apiUrl, transacao);
  }
}
