import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API_BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getUsuarioLogado(): Observable<Usuario> {
    console.log(
      'UsuarioService: Fazendo requisição GET para /usuario/me (para obter usuário logado)'
    );

    return this.http.get<Usuario>(`${this.API_BASE_URL}/usuario/me`);
  }

  getUsuarios(): Observable<Usuario[]> {
    console.log(
      'UsuarioService: Fazendo requisição GET para /usuario (para obter todos os usuários)'
    );
    return this.http.get<Usuario[]>(`${this.API_BASE_URL}/usuario`);
  }
}
