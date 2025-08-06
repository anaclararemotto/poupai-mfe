import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Categoria {
  _id: string;
  nome: string;
  tipo: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl = 'http://localhost:4000/categoria';

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}`);
  }

  listarCategoriasPorTipo(tipo: 'receita' | 'despesa'): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/tipo/${tipo}`);
  }
}
