import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';


registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
})
export class App {
  protected title = 'mfe';

  constructor(private authService: AuthService, private router : Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
