import { Component, inject } from '@angular/core';
import { Navbar } from "../../../shared/navbar/navbar";
import { IncomeAccount } from "../../income/income-account/income-account";
import { TimeFilter } from "../../../shared/time-filter/time-filter";
import { CardTransactions } from "../../../shared/card-transactions/card-transactions";
import { TransactionsButton } from "../../../shared/transactions-button/transactions-button";
import { Footer } from "../../../shared/footer/footer";
import { ApiService } from '../../../core/services/api.service';
import { ExpenseAccount } from "../expense-account/expense-account";

@Component({
  selector: 'app-expense',
  imports: [Navbar, TimeFilter, CardTransactions, TransactionsButton, Footer, ExpenseAccount],
  templateUrl: './expense.html',
  styleUrl: './expense.scss'
})
export class Expense {
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
