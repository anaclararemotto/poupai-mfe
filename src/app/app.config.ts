import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { tokenInterceptorFn } from './core/interceptors/token.interceptor';
import { provideNgxMask } from 'ngx-mask';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptorFn])),
    provideNgxMask(),
    
  ],
};
