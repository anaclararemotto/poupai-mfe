import { Component, inject } from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';
import { IncomeAccount } from '../../income/income-account/income-account';
import { TimeFilter } from '../../../shared/time-filter/time-filter';
import { CardTransactions } from '../../../shared/card-transactions/card-transactions';
import { TransactionsButton } from '../../../shared/transactions-button/transactions-button';
import { Footer } from '../../../shared/footer/footer';
import { ApiService } from '../../../core/services/api.service';
import { ExpenseAccount } from '../expense-account/expense-account';
import {
  Transacao,
  TransacoesService,
} from '../../../core/services/transacoes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense',
  imports: [
    Navbar,
    TimeFilter,
    CardTransactions,
    TransactionsButton,
    Footer,
    ExpenseAccount,
    CommonModule,
  ],
  templateUrl: './expense.html',
  styleUrl: './expense.scss',
})
export class Expense {
  api = inject(ApiService);
  selectedTransaction: any = null;
  showEditModal = false;
  showViewModal = false;
  showDeleteModal = false;

  transactions: Transacao[] = [];
  despesas: Transacao[] = [];

  private transacaoService = inject(TransacoesService);

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transacaoService.listarTransacoes().subscribe({
      next: (data) => {
        this.transactions = data;
        console.log('Todas as transações carregadas:', this.transactions);

        this.despesas = this.transactions.filter((t) => t.tipo === 'despesa');
        console.log('Despesas filtradas:', this.despesas);
      },
      error: (err) => console.error('Erro ao carregar transações', err),
    });
  }

  openEditModal(transaction: any) {
    this.selectedTransaction = transaction;
    this.showEditModal = true;
    this.showViewModal = false;
    this.showDeleteModal = false;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedTransaction = null;
  }

  openViewModal(transaction: any) {
    console.log('Abrindo modal View com transaction:', transaction);
    this.selectedTransaction = transaction;
    this.showViewModal = true;
    this.showEditModal = false;
    this.showDeleteModal = false;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedTransaction = null;
  }

  openDeleteModal(transaction: any) {
    console.log('openDeleteModal chamado com:', transaction);
    this.selectedTransaction = transaction;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedTransaction = null;
  }
}
