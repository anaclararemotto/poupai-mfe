import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.group('AuthGuard (MFE) - canActivate');
    console.log('Verificando acesso à rota:', state.url);

    return this.authService.currentToken$.pipe(
      take(1),
      map((token) => {
        if (!token) {
          console.warn('Token ausente. Redirecionando para /login do shell...');
          console.groupEnd();
          window.location.href = 'http://localhost:4200/login'; 
          return false;
        }

        console.log('Token encontrado, acesso permitido.');
        console.groupEnd();
        return true;
      })
    );
  }
}
