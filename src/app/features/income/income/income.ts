import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import {
  Transacao,
  TransacoesService,
} from '../../../core/services/transacoes.service';
import { CardTransactions } from '../../../shared/card-transactions/card-transactions';
import { Footer } from '../../../shared/footer/footer';
import { Navbar } from '../../../shared/navbar/navbar';
import { TimeFilter } from '../../../shared/time-filter/time-filter';
import { TransactionsButton } from '../../../shared/transactions-button/transactions-button';
import { IncomeAccount } from '../income-account/income-account';

@Component({
  selector: 'app-income',
  imports: [
    Navbar,
    IncomeAccount,
    TimeFilter,
    CardTransactions,
    TransactionsButton,
    Footer,
    CommonModule,
  ],
  templateUrl: './income.html',
  styleUrl: './income.scss',
})
export class Income {
  api = inject(ApiService);
  selectedTransaction: any = null;
  showEditModal = false;
  showViewModal = false;
  showDeleteModal = false;

  transactions: Transacao[] = [];
  receitas: Transacao[] = [];
  filteredTransactions: Transacao[] = [];

  private transacaoService = inject(TransacoesService);

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transacaoService.listarTransacoes().subscribe({
      next: (data) => {
        this.transactions = data;
        this.receitas = this.transactions.filter((t) => t.tipo === 'receita');

        this.receitas.sort((a, b) => {
          const dataA = new Date(a.data);
          const dataB = new Date(b.data);
          return dataB.getTime() - dataA.getTime();
        });

        this.applyFilter(2);
      },
      error: (err) => console.error('Erro ao carregar transações', err),
    });
  }

  onFilterChange(index: number): void {
    this.applyFilter(index);
  }

  applyFilter(index: number): void {
    const today = new Date();
    let parseDate: Date;

    switch (index) {
      case 0:
        parseDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
        break;
      case 1:
        parseDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 15
        );
        break;
      case 2:
        parseDate = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
        break;
      case 3:
        parseDate = new Date(
          today.getFullYear(),
          today.getMonth() - 3,
          today.getDate()
        );
        break;
      case 4:
        parseDate = new Date(
          today.getFullYear(),
          today.getMonth() - 6,
          today.getDate()
        );
        break;
      case 5:
        parseDate = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
        break;
      default:
        parseDate = new Date(0);
    }

    this.filteredTransactions = this.receitas.filter((t) => {
      const transactionDate = new Date(t.data);
      return transactionDate >= parseDate;
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
