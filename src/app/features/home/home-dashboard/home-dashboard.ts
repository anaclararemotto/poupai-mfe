import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Conta, ContaService } from '../../../core/services/conta.service';
import { TransacoesService } from '../../../core/services/transacoes.service';
Chart.register(...registerables);

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './home-dashboard.html',
  styleUrls: ['./home-dashboard.scss'],
})
export class HomeDashboard implements OnInit{
  public doughnutChartType: 'doughnut' = 'doughnut';
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    cutout: '70%',
  };

  public totalReceitaMes: number = 0;
  public totalDespesaMes: number = 0;
  public contaUsuario: Conta | null = null;
 public receitasChartData: ChartData<'doughnut'> = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ['#198754', '#0d6efd', '#ffc107', '#20c997', '#6610f2'],
      hoverBackgroundColor: ['#157347', '#0b5ed7', '#d39e00', '#17a2b8', '#5a349b'],
      borderColor: '#f0f0f0',
    },
  ],
};

public despesasChartData: ChartData<'doughnut'> = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ['#dc3545', '#fd7e14', '#6f42c1', '#d63384', '#0dcaf0'],
      hoverBackgroundColor: ['#c82333', '#e66a0a', '#5a349b', '#bf2a72', '#0aace6'],
      borderColor: '#f0f0f0',
    },
  ],
};

  constructor(
    private transacoesService: TransacoesService,
    private contaService: ContaService
  ) {}

  ngOnInit(): void {
    this.contaService.getContaDoUsuario().subscribe(conta => {
      this.contaUsuario = conta;
      if (this.contaUsuario) {
        this.fetchTotals();
        this.fetchCategorizedData();
      }
    });
  }

  private fetchTotals(): void {
    this.transacoesService.getTotalReceitas().subscribe({
      next: (data) => {
        this.totalReceitaMes = data.totalReceitas || 0;
      },
      error: (err) => {
        console.error('Erro ao buscar total de receitas:', err);
      }
    });

    this.transacoesService.getTotalDespesas().subscribe({
      next: (data) => {
        this.totalDespesaMes = data.totalDespesas || 0;
      },
      error: (err) => {
        console.error('Erro ao buscar total de despesas:', err);
      }
    });
  }

private fetchCategorizedData(): void {
  this.transacoesService.getReceitasPorCategoriaMes().subscribe({
    next: (data) => {
      if (!data.length) {
        this.receitasChartData = {
          labels: ['Sem dados'],
          datasets: [
            {
              data: [1],
              backgroundColor: ['#d3d3d3'], // cinza claro
              hoverBackgroundColor: ['#d3d3d3'],
              borderColor: '#f0f0f0',
            },
          ],
        };
      } else {
        const labels = data.map(item => item._id);
        const values = data.map(item => item.total);

        this.receitasChartData = {
          labels,
          datasets: [
            {
              ...this.receitasChartData.datasets[0],
              data: values,
            },
          ],
        };
      }
    },
    error: (err) => {
      console.error('Erro ao buscar receitas por categoria:', err);
    }
  });

  this.transacoesService.getDespesasPorCategoriaMes().subscribe({
    next: (data) => {
      if (!data.length) {
        this.despesasChartData = {
          labels: ['Sem dados'],
          datasets: [
            {
              data: [1],
              backgroundColor: ['#d3d3d3'], // cinza claro
              hoverBackgroundColor: ['#d3d3d3'],
              borderColor: '#f0f0f0',
            },
          ],
        };
      } else {
        const labels = data.map(item => item._id);
        const values = data.map(item => item.total);

        this.despesasChartData = {
          labels,
          datasets: [
            {
              ...this.despesasChartData.datasets[0],
              data: values,
            },
          ],
        };
      }
    },
    error: (err) => {
      console.error('Erro ao buscar despesas por categoria:', err);
    }
  });
}


}

