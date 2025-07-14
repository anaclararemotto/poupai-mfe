

import { Component } from '@angular/core';


@Component({
  selector: 'app-home-account',
  standalone: true, 
  imports: [], 
  templateUrl: './home-account.html',
  styleUrl: './home-account.scss'
})
export class HomeAccount {

  usuario: any;

  constructor() {

    this.usuario = { nome: 'Visitante' };
  }

}