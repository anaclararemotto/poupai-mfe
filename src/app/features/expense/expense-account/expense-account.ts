import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '../../../shared/actions/actions';
import { CardInfo } from '../../../shared/card-info/card-info';
import { ModalStatement } from '../../../shared/modal-statement/modal-statement';
import { ModalTransactions } from '../../../shared/modal-transactions/modal-transactions';

@Component({
  selector: 'app-expense-account',
  imports: [Actions, CardInfo, ModalStatement, ModalTransactions],
  templateUrl: './expense-account.html',
  styleUrl: './expense-account.scss',
})
export class ExpenseAccount {
  showStatementModal = false;
  private router = inject(Router);
  showModal = false;
  modalTipo: 'receita' | 'despesa' | 'transferencia' | null = null;

  openModal(tipo: 'receita' | 'despesa' | 'transferencia') {
    this.modalTipo = tipo;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalTipo = null;
  }

  openStatementModal() {
    console.log('Abrindo modal de extrato');
    this.showStatementModal = true;
  }

  closeStatementModal() {
    this.showStatementModal = false;
  }
  navigateTo(event: any) {
    const value = event.target.value;
    if (value) {
      this.router.navigate([value]);
    }
  }
}
