import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Importe a função jwtDecode

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  login(dados: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.API}/login`, dados).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  cadastrarUsuario(dados: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.API}/usuario`, dados);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  // NOVO MÉTODO: Extrai o ID do usuário do token
  getUserIdFromToken(): string | null {
    const token = this.token;
    if (!token) {
      return null;
    }
    
    try {
      const decodedToken: any = jwtDecode(token);
      // O 'sub' (subject) é a convenção padrão para o ID do usuário em tokens JWT.
      // Se seu backend usa outra propriedade, como '_id' ou 'id', ajuste aqui.
      return decodedToken.sub; 
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
}