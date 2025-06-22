import { Component } from '@angular/core';
import { TransactionsAccount } from "../transactions-account/transactions-account";
import { CardTransactions } from "../../../shared/card-transactions/card-transactions";
import { TransactionsButton } from "../../../shared/transactions-button/transactions-button";

@Component({
  selector: 'app-transactions',
  imports: [TransactionsAccount, CardTransactions, TransactionsButton],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions {

}
