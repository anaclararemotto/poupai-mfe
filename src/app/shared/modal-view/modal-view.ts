import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-view',
  imports: [CommonModule],
  templateUrl: './modal-view.html',
  styleUrl: './modal-view.scss',
})
export class ModalView {
  @Input() show = false;
  @Input() tipo: string | null = null;
  @Output() close = new EventEmitter<void>();

 @Input() selectedTransaction: any;


  onClose() {
    this.close.emit();
  }
}
