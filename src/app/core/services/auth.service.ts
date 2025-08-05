import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from './usuario.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = 'http://localhost:4000';
  private readonly MFE_HOME_URL = 'http://localhost:4201/home';

  private _currentToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public readonly currentToken$ = this._currentToken.asObservable();

  private _currentUser: BehaviorSubject<Usuario | null> =
    new BehaviorSubject<Usuario | null>(null);
  public readonly currentUser$ = this._currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    console.log(
      'DEBUG AuthService: Construtor chamado. Quebrando a dependência circular...'
    );
    this.checkTokenInUrlOnInit();
    this.loadTokenFromLocalStorage();
  }

  private loadTokenFromLocalStorage(): void {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this._currentToken.next(storedToken);
      console.log('DEBUG AuthService: Token carregado do localStorage.');
    }
  }

  private checkTokenInUrlOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl) {
      this.setToken(tokenFromUrl);
      console.log('DEBUG AuthService: Token encontrado na URL e salvo.');

      this.router.navigate([], {
        queryParams: { token: null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    }
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this._currentToken.next(token);
  }

  public setUser(usuario: Usuario): void {
    this._currentUser.next(usuario);
  }

  get token(): string | null {
    return this._currentToken.getValue();
  }
  
  get isLoggedIn(): boolean {
    return !!this.token;
  }

  isAuthenticatedUser(): boolean {
    return this.isLoggedIn;
  }

  login(dados: { email: string; senha: string }): Observable<any> {
    return this.http
      .post<{ token: string; usuario: Usuario }>(
        `${this.API}/auth/login`,
        dados
      )
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.setToken(response.token);
            this._currentUser.next(response.usuario);
            console.log(
              'DEBUG AuthService: Login BEM-SUCEDIDO. Redirecionando...'
            );
            window.location.href = `${this.MFE_HOME_URL}?token=${response.token}`;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

logout(): void {
  console.log('DEBUG AuthService: Logout iniciado no MFE');
  localStorage.removeItem('token');
  this._currentToken.next(null);
  this._currentUser.next(null);

  window.location.href = 'http://localhost:4200/login';
}


}
