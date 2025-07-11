import { Component } from '@angular/core';
import { HomeAccount } from "../home-account/home-account";
import { Actions } from "../../../shared/actions/actions";
import { CardInfo } from "../../../shared/card-info/card-info";
import { Navbar } from "../../../shared/navbar/navbar";
import { Footer } from "../../../shared/footer/footer";

@Component({
  selector: 'app-home',
  imports: [HomeAccount, Actions, CardInfo, Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
