import { Component } from '@angular/core';
import { CardInfo } from "../../../shared/card-info/card-info";
import { Actions } from "../../../shared/actions/actions";

@Component({
  selector: 'app-transactions-account',
  imports: [CardInfo, Actions],
  templateUrl: './transactions-account.html',
  styleUrl: './transactions-account.scss'
})
export class TransactionsAccount {

}
