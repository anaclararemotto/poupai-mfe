import { Component, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CardTransactions } from '../../../shared/card-transactions/card-transactions';
import { Navbar } from '../../../shared/navbar/navbar';
import { TimeFilter } from '../../../shared/time-filter/time-filter';
import { IncomeAccount } from '../income-account/income-account';
import { TransactionsButton } from '../../../shared/transactions-button/transactions-button';
import { Footer } from '../../../shared/footer/footer';
import {
  Transacao,
  TransacoesService,
} from '../../../core/services/transacoes.service';
import { CommonModule } from '@angular/common';

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

  private transacaoService = inject(TransacoesService);

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transacaoService.listarTransacoes().subscribe({
      next: (data) => {
        this.transactions = data;
        console.log('Todas as transações carregadas:', this.transactions);

        this.transactions.sort((a, b) => {
          const dataA = new Date(a.data);
          const dataB = new Date(b.data);
          return dataB.getTime() - dataA.getTime();
        });

        this.receitas = this.transactions.filter((t) => t.tipo === 'receita');
        console.log('Receitas filtradas:', this.receitas);
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
