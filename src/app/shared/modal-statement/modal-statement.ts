import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-statement',
  imports: [CommonModule],
  templateUrl: './modal-statement.html',
  styleUrl: './modal-statement.scss'
})
export class ModalStatement {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
  
}
