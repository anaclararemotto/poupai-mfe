import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '../../../shared/actions/actions';
import { CardInfo } from '../../../shared/card-info/card-info';
import { ModalStatement } from '../../../shared/modal-statement/modal-statement';
import { ModalTransactions } from '../../../shared/modal-transactions/modal-transactions';
import { Categoria } from '../../../core/services/categoria.service';
import { Banco } from '../../../core/services/banco.service';
import { Transacao, TransacoesService } from '../../../core/services/transacoes.service';
import { Conta, ContaService } from '../../../core/services/conta.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-expense-account',
  standalone: true,
  imports: [Actions, CardInfo, ModalStatement, ModalTransactions, CommonModule],
  templateUrl: './expense-account.html',
  styleUrl: './expense-account.scss',
})
export class ExpenseAccount implements OnInit {
  showStatementModal = false;
  private router = inject(Router);
  showModal = false;
  modalTipo: 'receita' | 'despesa' | 'transferencia' | null = null;
  categorias: Categoria[] = [];
  bancos: Banco[] = [];
  transacoes: Transacao[] = [];
  isLoadingTransactions = false;
  conta: Conta | null = null;

  constructor(
    private contaService: ContaService,
    private transacoesService: TransacoesService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loadConta();
    this.loadTransactions();
  }

  loadConta(): void {
    this.contaService.getContaDoUsuario().subscribe({
      next: (data) => {
        this.conta = data;
        console.log('Conta carregada:', this.conta);
      },
      error: (err) => {
        console.error('Erro ao carregar a conta', err);
      },
    });
  }

  loadTransactions() {
    this.isLoadingTransactions = true;
    this.transacoesService.listarTransacoes().pipe(
      finalize(() => {
        this.isLoadingTransactions = false;
      })
    ).subscribe({
      next: (data) => {
        this.transacoes = data;
        console.log('Transações carregadas:', this.transacoes);
      },
      error: (err) => {
        console.error('Erro ao carregar transações', err);
      },
    });
  }

  openModal(tipo: 'receita' | 'despesa' | 'transferencia') {
    console.log('Tentando abrir modal. Estado da conta:', this.conta);
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
    console.log('Evento de transação salva recebido. Recarregando dados...');
    this.closeModal();
    this.loadAllData();
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
