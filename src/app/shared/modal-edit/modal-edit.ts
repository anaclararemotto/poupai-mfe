import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-modal-edit',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.scss',
})
export class ModalEdit implements OnInit {
  @Input() show = false;
  @Input() tipo: string | null = null;
  @Input() transaction: any = null;
  @Output() close = new EventEmitter<void>();

  selectedTransaction: any = null;

  banks: any[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getBanks().subscribe((res) => {
      this.banks = res;
    });

    if (this.transaction) {
      this.selectedTransaction = {
        ...this.transaction,
        valor: Number(this.transaction.valor).toFixed(2),
        data: this.formatDate(this.transaction.data),
        banco: this.transaction.banco ?? '',
        bancoOrigem: Number(this.transaction.bancoOrigem),
      };
    }
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(d.getDate()).padStart(2, '0')}`;
  }

  onClose() {
    this.close.emit();
  }
}
