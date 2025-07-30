
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { provideNgxMask } from 'ngx-mask'; // Importação correta do ngx-mask

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        tokenInterceptor
      ])
    ),
    provideNgxMask(), // Uso correto dentro do array de providers
  ],
};