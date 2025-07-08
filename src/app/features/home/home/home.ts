import { Component } from '@angular/core';
import { HomeAccount } from "../home-account/home-account";
import { Actions } from "../../../shared/actions/actions";
import { CardInfo } from "../../../shared/card-info/card-info";
import { HomeDashboard } from "../home-dashboard/home-dashboard";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeAccount,
    Actions,
    CardInfo,
    HomeDashboard
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {


}
