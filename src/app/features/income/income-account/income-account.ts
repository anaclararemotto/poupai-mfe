import { Component } from '@angular/core';
import { CardInfo } from "../../../shared/card-info/card-info";
import { Actions } from "../../../shared/actions/actions";
import { ModalStatement } from "../../../shared/modal-statement/modal-statement";
import { ModalTransactions } from "../../../shared/modal-transactions/modal-transactions";

@Component({
  selector: 'app-income-account',
  imports: [CardInfo, Actions, ModalStatement, ModalTransactions],
  templateUrl: './income-account.html',
  styleUrl: './income-account.scss'
})
export class IncomeAccount {
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
