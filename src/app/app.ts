import { Component } from '@angular/core';
import { HomeComponent } from "./features/home/home";

@Component({
  selector: 'app-root',
  imports: [ HomeComponent, HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'mfe';
}
