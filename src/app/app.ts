import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';


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
}
