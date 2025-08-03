import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from '../../core/services/categoria.services';

@Component({
  selector: 'app-card-transactions',
  imports: [CommonModule, DatePipe],
  templateUrl: './card-transactions.html',
  styleUrl: './card-transactions.scss',
})
export class CardTransactions {
  @Input() transaction: any;
  @Output() edit = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  categorias: Categoria[] = [];

  onEdit() {
    this.edit.emit(this.transaction);
  }

  onView() {
  this.view.emit(this.transaction);
}
  onDelete() {
  this.delete.emit(this.transaction);
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

  getNomeCategoria(id: string): string {
    const cat = this.categorias.find((c) => c._id === id);
    return cat ? cat.nome : '';
  }

  getBancoDisplay(transaction: any): string {
    if (transaction.tipo === 'transferencia') {
      return `${transaction.bancoOrigem?.nome || ''} → ${
        transaction.bancoDestino?.nome || ''
      }`;
    }
    
    const nomeCategoria = transaction.categoria?.nome || '';
    
    if (transaction.tipo === 'receita') {
      return `${transaction.bancoDestino?.nome || ''} | ${nomeCategoria}`;
    }
    if (transaction.tipo === 'despesa') {
      return `${transaction.bancoOrigem?.nome || ''} | ${nomeCategoria}`;
    }

    return '';
  }


  formatarValor(valor: number): string {
    if (valor == null) return '';
    return valor.toFixed(2).replace('.', ',');
  }
}
