import { Component } from '@angular/core';
import { HomeAccount } from "../home-account/home-account";
import { Actions } from "../../../shared/actions/actions";
import { CardInfo } from "../../../shared/card-info/card-info";
import { Navbar } from "../../../shared/navbar/navbar";
import { Footer } from "../../../shared/footer/footer";
import { ModalStatement } from "../../../shared/modal-statement/modal-statement";
import { CommonModule } from '@angular/common';
import { ModalTransactions } from "../../../shared/modal-transactions/modal-transactions";

@Component({
  selector: 'app-home',
  imports: [HomeAccount, Actions, CardInfo, Navbar, Footer, ModalStatement, CommonModule, ModalTransactions],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
showStatementModal = false

 showModal = false;
  modalTipo: 'receita' |'despesa' | 'transferencia' | null = null;

  openModal(tipo: 'receita' | 'despesa' | 'transferencia') {
    this.modalTipo = tipo;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalTipo = null;
  }

openStatementModal(){
  console.log('Abrindo modal de extrato');
  this.showStatementModal = true;
}

closeStatementModal(){
  this.showStatementModal = false;
  
}
}
