import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Expense } from './expense/expense';

const routes: Routes = [
  { path: '', component: Expense }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
