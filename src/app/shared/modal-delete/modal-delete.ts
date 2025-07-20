import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  imports: [CommonModule],
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.scss'
})
export class ModalDelete {
@Input() show = false;
  @Input() selectedTransaction: any;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<string>();

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
  console.log('MODAL DELETE ABRIU:', this.selectedTransaction);
}

  onConfirm() {
    this.confirm.emit(this.selectedTransaction?._id);
  }
}
