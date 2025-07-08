import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CardTransactions } from '../../../shared/card-transactions/card-transactions';
import { Footer } from '../../../shared/footer/footer';
import { ModalEdit } from '../../../shared/modal-edit/modal-edit';
import { Navbar } from '../../../shared/navbar/navbar';
import { TimeFilter } from '../../../shared/time-filter/time-filter';
import { TransactionsButton } from '../../../shared/transactions-button/transactions-button';
import { TransactionsAccount } from '../transactions-account/transactions-account';
import { ModalView } from '../../../shared/modal-view/modal-view';

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
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {
  api = inject(ApiService);
  transactions: any[] = [];
  selectedTransaction: any = null;
  showEditModal = false;
  showViewModal = false;

  ngOnInit() {
    this.api.getTransactions().subscribe((res) => {
      this.transactions = res.map((t) => {
        return {
          ...t,
          data: new Date(t.data),
        };
      });
    });
  }

  openEditModal(transaction: any) {
    this.selectedTransaction = transaction;
    this.showEditModal = true;
    this.showViewModal = false;
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
}


  closeViewModal() {
    this.showViewModal = false;
    this.selectedTransaction = null;
  }
}
