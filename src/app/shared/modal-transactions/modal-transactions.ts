import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-modal-transactions',
  imports: [CommonModule, NgxMaskDirective],
  templateUrl: './modal-transactions.html',
  styleUrl: './modal-transactions.scss'
})
export class ModalTransactions {
  @Input() show = false;
  @Input() tipo: 'receita' | 'despesa' | 'transferencia' | null = null;
  @Output() close = new EventEmitter<void>();

  dataHoje: string = new Date().toISOString().split('T')[0];

  onClose() {
    this.close.emit();
  }
}
