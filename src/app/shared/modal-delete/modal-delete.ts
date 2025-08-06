import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  imports: [CommonModule],
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.scss',
})
export class ModalDelete {
  @Input() show: boolean = false;
  @Input() selectedTransaction: any;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onClose() {
    this.close.emit();
  }
}
