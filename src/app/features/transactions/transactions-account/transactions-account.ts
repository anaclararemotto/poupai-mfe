import { Component } from '@angular/core';
import { CardInfo } from "../../../shared/card-info/card-info";
import { Actions } from "../../../shared/actions/actions";
import { ModalStatement } from "../../../shared/modal-statement/modal-statement";
import { ModalTransactions } from "../../../shared/modal-transactions/modal-transactions";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-account',
  imports: [CardInfo, Actions, ModalStatement, ModalTransactions, CommonModule],
  templateUrl: './transactions-account.html',
  styleUrl: './transactions-account.scss'
})
export class TransactionsAccount {
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
