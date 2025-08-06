import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth-guard';
import { Expense } from './expense/expense';

const routes: Routes = [
  { path: '', component: Expense, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseRoutingModule {}
