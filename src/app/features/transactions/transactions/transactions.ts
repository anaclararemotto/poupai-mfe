import { Component } from '@angular/core';
import { CardTransactions } from "../../../shared/card-transactions/card-transactions";
import { TimeFilter } from "../../../shared/time-filter/time-filter";
import { TransactionsButton } from "../../../shared/transactions-button/transactions-button";
import { TransactionsAccount } from "../transactions-account/transactions-account";

@Component({
  selector: 'app-transactions',
  imports: [TransactionsAccount, CardTransactions, TransactionsButton, TimeFilter],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions {

}
