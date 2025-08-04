import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '../../../shared/actions/actions';
import { CardInfo } from '../../../shared/card-info/card-info';
import { ModalStatement } from '../../../shared/modal-statement/modal-statement';
import { ModalTransactions } from '../../../shared/modal-transactions/modal-transactions';
import { Conta, ContaService } from '../../../core/services/conta.service';

@Component({
  selector: 'app-transactions-account',
  standalone: true,
  imports: [CardInfo, Actions, ModalStatement, ModalTransactions, CommonModule],
  templateUrl: './transactions-account.html',
  styleUrl: './transactions-account.scss',
})
export class TransactionsAccount implements OnInit {
  showStatementModal = false;
  private router = inject(Router);

  showModal = false;
  modalTipo: 'receita' | 'despesa' | 'transferencia' | null = null;
  conta: Conta | null = null;

  constructor(
    private contaService: ContaService
  ) {}

  ngOnInit(): void {
    this.loadConta();
  }
  reloadPage(): void {
    window.location.reload();
  }

  loadConta(): void {
    this.contaService.getContaDoUsuario().subscribe({
      next: (data) => {
        this.conta = data;
        console.log('Conta carregada em TransactionsAccount:', this.conta);
      },
      error: (err) => {
        console.error('Erro ao carregar a conta em TransactionsAccount', err);
      },
    });
  }

  openModal(tipo: 'receita' | 'despesa' | 'transferencia') {
    if (this.conta && this.conta._id) {
      this.modalTipo = tipo;
      this.showModal = true;
    } else {
      console.error(
        'Erro: A conta não está carregada. Não é possível abrir o modal.'
      );
    }
  }

  closeModal() {
    this.showModal = false;
    this.modalTipo = null;
  }

  handleTransactionSaved(): void {
    console.log('Transação salva em TransactionsAccount. Fechando modal.');
    this.closeModal();
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
