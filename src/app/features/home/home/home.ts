import { Component } from '@angular/core';
import { HomeAccount } from "../home-account/home-account";
import { Actions } from "../../../shared/actions/actions";
import { CardInfo } from "../../../shared/card-info/card-info";

@Component({
  selector: 'app-home',
  imports: [HomeAccount, Actions, CardInfo],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
