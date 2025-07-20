import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-actions',
  imports: [CommonModule],
  templateUrl: './actions.html',
  styleUrl: './actions.scss'
})
export class Actions {
  @Output() statement = new EventEmitter<void>();
  @Output() abrirModal = new EventEmitter<'receita' | 'despesa' | 'transferencia'>();

  abrir(tipo: 'receita' | 'despesa' | 'transferencia') {
    this.abrirModal.emit(tipo);
  }

  onStatement(){
    this.statement.emit();
  }

  

}
