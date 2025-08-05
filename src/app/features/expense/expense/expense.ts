import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import {
  NovaTransacao,
  Transacao,
  TransacoesService,
} from '../../../core/services/transacoes.service';
import { CardTransactions } from '../../../shared/card-transactions/card-transactions';
import { Footer } from '../../../shared/footer/footer';
import { ModalDelete } from '../../../shared/modal-delete/modal-delete';
import { ModalEdit } from '../../../shared/modal-edit/modal-edit';
import { ModalView } from '../../../shared/modal-view/modal-view';
import { Navbar } from '../../../shared/navbar/navbar';
import { TimeFilter } from '../../../shared/time-filter/time-filter';
import { TransactionsButton } from '../../../shared/transactions-button/transactions-button';
import { ExpenseAccount } from '../expense-account/expense-account';

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
    ModalDelete,
    ModalEdit,
    ModalView,
  ],
  templateUrl: './expense.html',
  styleUrl: './expense.scss',
})
export class Expense {
  api = inject(ApiService);
  selectedTransaction: Transacao | null = null;
  showEditModal = false;
  showViewModal = false;
  showDeleteModal = false;

  transactions: Transacao[] = [];
  despesas: Transacao[] = [];
  filteredTransactions: Transacao[] = [];

  private transacaoService = inject(TransacoesService);

  private normalizeDate(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transacaoService.listarTransacoes().subscribe({
      next: (data) => {
        this.transactions = data;

        this.despesas = this.transactions.filter((t) => t.tipo === 'despesa');

        this.despesas.sort((a, b) => {
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
        parseDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case 3:
        parseDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
        break;
      case 4:
        parseDate = new Date(today.getFullYear(), today.getMonth() - 6, 1);
        break;
      case 5:
        parseDate = new Date(0);
        break;
      default:
        parseDate = new Date(0);
    }

    this.filteredTransactions = this.despesas.filter((t) => {
      const transactionDate = new Date(t.data);
      const normalizedTransactionDate = this.normalizeDate(transactionDate);
      const normalizedParseDate = this.normalizeDate(parseDate);

      return normalizedTransactionDate >= normalizedParseDate;
    });
  }

  onDeleteTransaction(transaction: Transacao) {
    this.selectedTransaction = transaction;
    this.showDeleteModal = true;
    this.showEditModal = false;
    this.showViewModal = false;
  }

  onConfirmDelete() {
    if (this.selectedTransaction && this.selectedTransaction._id) {
      this.transacaoService
        .excluirTransacao(this.selectedTransaction._id)
        .subscribe({
          next: () => {
            console.log('Transação excluída com sucesso!');
            this.closeDeleteModal();
            this.loadTransactions();
          },
          error: (err) => {
            console.error('Erro ao excluir transação', err);
            this.closeDeleteModal();
          },
        });
    } else {
      console.error('Nenhuma transação selecionada ou ID ausente.');
    }
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedTransaction = null;
  }

  onEditTransaction(transaction: Transacao) {
    this.selectedTransaction = transaction;
    this.showEditModal = true;
    this.showViewModal = false;
    this.showDeleteModal = false;
  }

  onSaveEditedTransaction(
    updatedTransaction: Partial<NovaTransacao> & { _id: string }
  ) {
    if (updatedTransaction._id) {
      const { _id, ...transactionDataToSend } = updatedTransaction;
      this.transacaoService
        .editarTransacao(_id, transactionDataToSend)
        .subscribe({
          next: () => {
            console.log('Transação editada com sucesso!');
            this.closeEditModal();
            this.loadTransactions();
          },
          error: (err) => {
            console.error('Erro ao salvar edição da transação', err);
            this.closeEditModal();
          },
        });
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedTransaction = null;
  }

  openViewModal(transaction: Transacao) {
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
}
