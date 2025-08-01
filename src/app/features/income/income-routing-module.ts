import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Income } from './income/income';

const routes: Routes = [
  { path: '', component: Income }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
