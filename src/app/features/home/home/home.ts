import { Component } from '@angular/core';
import { HomeAccount } from "../home-account/home-account";

@Component({
  selector: 'app-home',
  imports: [HomeAccount],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
