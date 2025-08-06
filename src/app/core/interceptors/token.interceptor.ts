import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

export const tokenInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.token;

  console.log(
    'DEBUG Interceptor: Tentando obter token. Token atual:',
    token ? token.substring(0, 30) + '...' : 'NULO'
  );

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.error(
          'DEBUG Interceptor: Erro 401/403. Token expirado ou inválido. Deslogando...'
        );
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
