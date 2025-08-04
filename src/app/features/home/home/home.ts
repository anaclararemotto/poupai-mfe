import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Banco } from '../../../core/services/banco.service';
import { Categoria } from '../../../core/services/categoria.service';
import { Conta, ContaService } from '../../../core/services/conta.service';
import { Transacao, TransacoesService } from '../../../core/services/transacoes.service';
import { Actions } from '../../../shared/actions/actions';
import { CardInfo } from '../../../shared/card-info/card-info';
import { Footer } from '../../../shared/footer/footer';
import { ModalStatement } from '../../../shared/modal-statement/modal-statement';
import { ModalTransactions } from '../../../shared/modal-transactions/modal-transactions';
import { Navbar } from '../../../shared/navbar/navbar';
import { HomeAccount } from '../home-account/home-account';
import { HomeDashboard } from '../home-dashboard/home-dashboard';

@Component({
  selector: 'app-home',
  imports: [
    HomeAccount,
    Actions,
    CardInfo,
    Navbar,
    Footer,
    ModalStatement,
    CommonModule,
    ModalTransactions,
    HomeDashboard,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  showStatementModal = false;

  categorias: Categoria[] = [];

  bancos: Banco[] = [];
  showModal = false;
  modalTipo: 'receita' | 'despesa' | 'transferencia' | null = null;

   transacoes: Transacao[] = [];

  isLoadingTransactions = false;

   conta: Conta | null = null;

  constructor(
    private contaService: ContaService,
    private transacoesService: TransacoesService
  ) {}

  ngOnInit(): void {
    this.loadConta();
    this.loadTransactions();
  }

loadConta(): void {
    this.contaService.getContaDoUsuario().subscribe({
      next: (data) => {
        this.conta = data;
        console.log('Conta carregada:', this.conta);
      },
      error: (err) => {
        console.error('Erro ao carregar a conta', err);
      }
    });
  }

  loadTransactions() {
  this.transacoesService.listarTransacoes().subscribe({
    next: (data) => {
      this.transacoes = data;
    },
    error: (err) => {
      console.error('Erro ao carregar transações', err);
    },
  });
  }

  openModal(tipo: 'receita' | 'despesa' | 'transferencia') {
    this.modalTipo = tipo;
    this.showModal = true;
     if (this.conta && this.conta._id) {
    this.modalTipo = tipo;
    this.showModal = true;
  } else {
    console.error('Erro: A conta não está carregada. Não é possível abrir o modal.');
  }
  }

  closeModal() {
    this.showModal = false;
    this.modalTipo = null;
  }

  openStatementModal() {
    console.log('Abrindo modal de extrato');
    this.showStatementModal = true;
  }

  closeStatementModal() {
    this.showStatementModal = false;
  }
}
