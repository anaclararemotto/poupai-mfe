import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-time-filter',
  imports: [CommonModule],
  templateUrl: './time-filter.html',
  styleUrl: './time-filter.scss',
})
export class TimeFilter {
  selectedIndex = 0;

  options = [
    'Última semana',
    'Últimos 15 dias',
    'Último mês',
    'Últimos 3 meses',
    'Últimos 6 meses',
    'Último ano',
  ];

  selectOption(index: number): void {
  this.selectedIndex = index;
}
}
