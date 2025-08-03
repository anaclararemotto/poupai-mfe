import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CardTransactions } from '../../../shared/card-transactions/card-transactions';
import { Footer } from '../../../shared/footer/footer';
import { ModalDelete } from '../../../shared/modal-delete/modal-delete';
import { ModalEdit } from '../../../shared/modal-edit/modal-edit';
import { ModalView } from '../../../shared/modal-view/modal-view';
import { Navbar } from '../../../shared/navbar/navbar';
import { TimeFilter } from '../../../shared/time-filter/time-filter';
import { TransactionsButton } from '../../../shared/transactions-button/transactions-button';
import { TransactionsAccount } from '../transactions-account/transactions-account';
import {
  Transacao,
  TransacoesService,
} from '../../../core/services/transacoes.service';

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
  selectedTransaction: any = null;
  showEditModal = false;
  showViewModal = false;
  showDeleteModal = false;
  transactions: Transacao[] = [];

  private transacaoService = inject(TransacoesService);

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transacaoService.listarTransacoes().subscribe({
      next: (data) => {
        this.transactions = data;
        console.log('Transações carregadas:', this.transactions);
        this.transactions.sort((a, b) => {
          const dataA = new Date(a.data);
          const dataB = new Date(b.data);
          return dataB.getTime() - dataA.getTime();
        });
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
