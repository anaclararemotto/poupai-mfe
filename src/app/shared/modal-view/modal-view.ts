import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Transacao } from '../../core/services/transacoes.service';

interface PopulatedField {
  nome: string;
}

@Component({
  selector: 'app-modal-view',
  imports: [CommonModule],
  templateUrl: './modal-view.html',
  styleUrl: './modal-view.scss',
})
export class ModalView implements OnChanges {
  @Input() show: boolean = false;
  @Input() selectedTransaction: Transacao | null = null;
  @Output() close = new EventEmitter<void>();

  transactionType: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTransaction'] && this.selectedTransaction) {
      this.transactionType =
        typeof this.selectedTransaction.tipo === 'string'
          ? this.selectedTransaction.tipo.toLowerCase().trim()
          : '';
      console.log('ModalView: Transação recebida:', this.selectedTransaction);
      console.log(
        'ModalView: Tipo normalizado para ngSwitch:',
        this.transactionType
      );
    }
  }

  getPopulatedName(field: string | PopulatedField | undefined | null): string {
    if (field && typeof field === 'object' && 'nome' in field) {
      return field.nome;
    }
    return 'N/A';
  }

  onClose(): void {
    this.close.emit();
  }
}
