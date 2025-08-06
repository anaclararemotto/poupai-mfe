
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { AuthGuard } from '../../auth-guard';



const routes: Routes = [
  { path: '', component: Home, canActivate: [AuthGuard]  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
