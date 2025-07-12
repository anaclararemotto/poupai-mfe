import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-actions',
  imports: [],
  templateUrl: './actions.html',
  styleUrl: './actions.scss'
})
export class Actions {
  @Output() statement = new EventEmitter<void>();

  onStatement(){
    this.statement.emit();
  }

  

}
