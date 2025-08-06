import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Income } from './income/income';
import { AuthGuard } from '../../auth-guard';

const routes: Routes = [
  { path: '', component: Income, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
