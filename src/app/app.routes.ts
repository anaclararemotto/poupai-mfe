import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home-module').then((m) => m.HomeModule),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./features/transactions/transactions-module').then((m) => m.TransactionsModule),
  },
  { path: '**', redirectTo: '/home' },

];
