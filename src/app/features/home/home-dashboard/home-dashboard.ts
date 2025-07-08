
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ChartData, ChartType,  ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './home-dashboard.html',
  styleUrls: ['./home-dashboard.scss']
})
export class HomeDashboard {

  // --- CONFIGURAÇÕES GERAIS PARA AMBOS OS GRÁFICOS ---
  
  public doughnutChartType: 'doughnut' = 'doughnut';
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right', // Posição da legenda como na foto
      }
    },
    cutout: '70%' // Deixa o "buraco" do Donut maior, como na foto
  };

  // --- DADOS DO GRÁFICO DE RECEITAS ---
  public receitasChartLabels: string[] = ['Salário', 'Freelance', 'Investimentos'];
  public receitasChartData: ChartData<'doughnut'> = {
    labels: this.receitasChartLabels,
    datasets: [{
      data: [3700, 750, 400],
      backgroundColor: ['#198754', '#0d6efd', '#ffc107'], // Verde, Azul, Amarelo
      hoverBackgroundColor: ['#157347', '#0b5ed7', '#d39e00'],
      borderColor: '#f0f0f0'
    }]
  };

  // --- DADOS DO GRÁFICO DE DESPESAS ---
  public despesasChartLabels: string[] = ['Alimentação', 'Moradia', 'Transporte', 'Lazer'];
  public despesasChartData: ChartData<'doughnut'> = {
    labels: this.despesasChartLabels,
    datasets: [{
      data: [800, 1200, 350, 450],
      backgroundColor: ['#dc3545', '#fd7e14', '#6f42c1', '#d63384'], // Vermelho, Laranja, Roxo, Rosa
      hoverBackgroundColor: ['#c82333', '#e66a0a', '#5a349b', '#bf2a72'],
      borderColor: '#f0f0f0'
    }]
  };

  constructor() {}
}
