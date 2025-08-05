import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conta, ContaService } from '../../../core/services/conta.service';
import { Actions } from '../../../shared/actions/actions';
import { CardInfo } from '../../../shared/card-info/card-info';
import { ModalStatement } from '../../../shared/modal-statement/modal-statement';
import { ModalTransactions } from '../../../shared/modal-transactions/modal-transactions';

@Component({
  selector: 'app-income-account',
  standalone: true,
  imports: [CardInfo, Actions, ModalStatement, ModalTransactions, CommonModule],
  templateUrl: './income-account.html',
  styleUrl: './income-account.scss',
})
export class IncomeAccount implements OnInit {
  showStatementModal = false;
  private router = inject(Router);

  showModal = false;
  modalTipo: 'receita' | 'despesa' | 'transferencia' | null = null;

  conta: Conta | null = null;

  constructor(private contaService: ContaService) {}

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
        console.log('Conta carregada em IncomeAccount:', this.conta);
      },
      error: (err) => {
        console.error('Erro ao carregar a conta em IncomeAccount', err);
      },
    });
  }

  openModal(tipo: 'receita' | 'despesa' | 'transferencia') {
    console.log(
      'Tentando abrir modal em IncomeAccount. Estado da conta:',
      this.conta
    );
    if (this.conta && this.conta._id) {
      console.log('Conta carregada. Abrindo o modal...');
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
    console.log('Transação salva em IncomeAccount. Fechando modal.');
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
