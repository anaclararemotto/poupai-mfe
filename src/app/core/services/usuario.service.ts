// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs'; 


// export interface Usuario {
//   // id: number;
//   _id: string; // Mude de 'id: number' para '_id: string'
//   nome: string;
//   email: string;
//   senha: string; // Adicione a propriedade 'senha'
  
// }

// @Injectable({
//   providedIn: 'root' 
// })
// export class UsuarioService {
//   private apiUrl = 'http://localhost:4000/usuario';

//   constructor(private http: HttpClient) { }

//   getUsuarios(): Observable<Usuario[]> {
//     return this.http.get<Usuario[]>(this.apiUrl);
//   }


// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importe HttpHeaders
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importe o AuthService para obter o token

export interface Usuario {
  _id: string;
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:4000/usuario'; // Rota para listar todos/cadastrar
  private apiMeUrl = 'http://localhost:4000/usuario/me'; // NOVA ROTA para o usuário logado

  constructor(
    private http: HttpClient,
    private authService: AuthService // Injete o AuthService
  ) { }

  getUsuarios(): Observable<Usuario[]> {
    // Este método lista todos os usuários.
    // Em produção, você pode querer restringir o acesso a ele.
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // NOVO MÉTODO: Para buscar as informações do usuário logado
  getUsuarioLogado(): Observable<Usuario> {
    // Em um cenário com interceptor HTTP, você não precisaria adicionar o header aqui.
    // O interceptor adicionaria o token automaticamente a *todas* as requisições autenticadas.
    // Mas se você ainda não tem um interceptor, esta é uma forma de garantir o token.

    const token = this.authService.token; // Obtém o token do AuthService

    if (!token) {
      // Se não houver token, você pode lançar um erro ou retornar um observable vazio/erro
      throw new Error('Token de autenticação não encontrado.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho Authorization
    });

    return this.http.get<Usuario>(this.apiMeUrl, { headers: headers });
  }

  // ... (outros métodos como cadastrarUsuario, se existirem)
}