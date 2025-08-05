import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Transactions } from './transactions/transactions';
import { AuthGuard } from '../../auth-guard';

const routes: Routes = [{ path: '', component: Transactions, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
