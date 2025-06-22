import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./features/home/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'mfe';
}
