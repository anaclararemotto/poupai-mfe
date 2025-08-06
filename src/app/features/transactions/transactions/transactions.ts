import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { TransactionsAccount } from '../transactions-account/transactions-account';

@Component({
  selector: 'app-transactions',
  imports: [
    TransactionsAccount,
    CardTransactions,
    TransactionsButton,
    TimeFilter,
    Navbar,
    Footer,
    ModalEdit,
    CommonModule,
    ModalView,
    ModalDelete,
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {
  api = inject(ApiService);
  selectedTransaction: Transacao | null = null; 
  showEditModal = false; 
  showViewModal = false;
  showDeleteModal = false;

  transactions: Transacao[] = []; 
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
        
        this.transactions.sort((a, b) => {
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
        parseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        break;
      case 1: 
        parseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 15);
        break;
      case 2: 
        parseDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        break;
      case 3: 
        parseDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        break;
      case 4: 
        parseDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
        break;
      case 5: 
        parseDate = new Date(0); 
        break;
      default:
        parseDate = new Date(0); 
    }

    this.filteredTransactions = this.transactions.filter((t) => {
      const transactionDate = new Date(t.data);
      return this.normalizeDate(transactionDate) >= this.normalizeDate(parseDate);
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
      this.transacaoService.excluirTransacao(this.selectedTransaction._id).subscribe({
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
    }
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedTransaction = null;
  }

  onEditTransaction(transaction: Transacao) {
    this.selectedTransaction = transaction; 
    this.showEditModal = true; 
    this.showDeleteModal = false; 
    this.showViewModal = false;
  }

  onSaveEditedTransaction(updatedTransaction: Partial<NovaTransacao> & { _id: string }) {
    if (updatedTransaction._id) {
      const { _id, ...transactionDataToSend } = updatedTransaction;

      this.transacaoService.editarTransacao(_id, transactionDataToSend).subscribe({
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