import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home-module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./features/transactions/transactions-module').then(
        (m) => m.TransactionsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'income',
    loadChildren: () =>
      import('./features/income/income-module').then(
        (m) => m.IncomeModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'expense',
    loadChildren: () =>
      import('./features/expense/expense-module').then(
        (m) => m.ExpenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/home/home-module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '/home' },
];
