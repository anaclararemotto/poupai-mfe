import { Component } from '@angular/core';
import { TransactionsAccount } from "../transactions-account/transactions-account";
import { CardTransactions } from "../../../shared/card-transactions/card-transactions";

@Component({
  selector: 'app-transactions',
  imports: [TransactionsAccount, CardTransactions],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions {

}
