import { Component, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CardTransactions } from "../../../shared/card-transactions/card-transactions";
import { Navbar } from "../../../shared/navbar/navbar";
import { TimeFilter } from "../../../shared/time-filter/time-filter";
import { IncomeAccount } from "../income-account/income-account";
import { TransactionsButton } from "../../../shared/transactions-button/transactions-button";
import { Footer } from "../../../shared/footer/footer";

@Component({
  selector: 'app-income',
  imports: [Navbar, IncomeAccount, TimeFilter, CardTransactions, TransactionsButton, Footer],
  templateUrl: './income.html',
  styleUrl: './income.scss'
})
export class Income {
  api = inject(ApiService);
transactions: any[] = [];
  selectedTransaction: any = null;
  showEditModal = false;
  showViewModal = false;
showDeleteModal = false;

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
