import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 


export interface Usuario {
  id: number;
  nome: string;
  email: string;
  
}

@Injectable({
  providedIn: 'root' 
})
export class UsuarioService {
  private apiUrl = 'http://localhost:4000/usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }


}