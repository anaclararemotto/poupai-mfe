import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-transactions',
  imports: [CommonModule, DatePipe],
  templateUrl: './card-transactions.html',
  styleUrl: './card-transactions.scss',
})
export class CardTransactions {
  @Input() transaction: any;
  @Output() edit = new EventEmitter<any>();

  onEdit() {
    this.edit.emit(this.transaction);
  }

  getIconClass(tipo: string): string {
    switch (tipo) {
      case 'receita':
        return 'bi-arrow-up';
      case 'despesa':
        return 'bi-arrow-down';
      case 'transferencia':
        return 'bi-arrow-left-right';
      default:
        return 'bi-question-circle';
    }
  }

  getBancoDisplay(transaction: any): string {
    if (transaction.tipo === 'transferencia') {
      return `${transaction.bancoOrigem?.nome || ''} → ${
        transaction.bancoDestino?.nome || ''
      }`;
    }
    if (transaction.tipo === 'receita') {
      return transaction.bancoDestino?.nome || '';
    }
    if (transaction.tipo === 'despesa') {
      return transaction.bancoOrigem?.nome || '';
    }
    return '';
  }

  formatarValor(valor: number): string {
    if (valor == null) return '';
    return valor.toFixed(2).replace('.', ',');
  }
}
