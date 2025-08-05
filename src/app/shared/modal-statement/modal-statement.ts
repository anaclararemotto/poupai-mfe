import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-statement',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-statement.html',
  styleUrl: './modal-statement.scss',
})
export class ModalStatement {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  tipoTransacao: string | null = null;

  constructor(private router: Router) {}

  onClose() {
    this.close.emit();
  }

  buscarExtrato() {
    const queryParams: any = {};

    let rotaDestino: string;
    switch (this.tipoTransacao) {
      case 'Receita':
        rotaDestino = '/income';
        break;
      case 'Despesa':
        rotaDestino = '/expense';
        break;
      case 'Transferência':
        rotaDestino = '/transactions';
        break;
      default:
        rotaDestino = '/transactions';
        break;
    }

    this.onClose();
    this.router.navigate([rotaDestino], { queryParams: queryParams });
  }
}
