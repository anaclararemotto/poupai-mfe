import { Component } from '@angular/core';
import { TransactionsAccount } from "../transactions-account/transactions-account";
import { CardTransactions } from "../../../shared/card-transactions/card-transactions";
import { TransactionsButton } from "../../../shared/transactions-button/transactions-button";
import { TimeFilter } from "../../../shared/time-filter/time-filter";

@Component({
  selector: 'app-transactions',
  imports: [TransactionsAccount, CardTransactions, TransactionsButton, TimeFilter],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions {

}
