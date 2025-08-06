import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransacoesService } from '../../core/services/transacoes.service';

@Component({
  selector: 'app-card-info',
  imports: [CommonModule, RouterLink],
  templateUrl: './card-info.html',
  styleUrl: './card-info.scss',
})
export class CardInfo implements OnInit {
  private transacaoService = inject(TransacoesService);
  private cdr = inject(ChangeDetectorRef);

  totalReceitas: number = 0;
  totalDespesas: number = 0;

  ngOnInit() {
    this.carregarTotais();
  }

  carregarTotais() {
    this.transacaoService.getTotalReceitas().subscribe({
      next: (res) => {
        this.totalReceitas = res.totalReceitas;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Erro ao carregar receitas', err),
    });

    this.transacaoService.getTotalDespesas().subscribe({
      next: (res) => {
        this.totalDespesas = res.totalDespesas;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Erro ao carregar despesas', err),
    });
  }
}
