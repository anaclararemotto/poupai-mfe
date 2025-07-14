import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import {
  TransacoesService,
  NovaTransacao,
} from '../../core/services/transacoes.service';
import { Banco, BancoService } from '../../core/services/banco.service';
import {
  Categoria,
  CategoriaService,
} from '../../core/services/categoria.services';

@Component({
  selector: 'app-modal-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './modal-transactions.html',
  styleUrls: ['./modal-transactions.scss'],
})
export class ModalTransactions implements OnInit, OnChanges {
  @Input() show = false;
  @Input() tipo: 'receita' | 'despesa' | 'transferencia' | null = 'receita';
  @Input() contaId!: string;

  @Output() close = new EventEmitter<void>();
  @Output() transacaoSalva = new EventEmitter<void>();

  dataHoje: string;
  bancos: Banco[] = [];
  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];

  constructor(
    private transacoesService: TransacoesService,
    private bancoService: BancoService,
    private categoriaService: CategoriaService
  ) {
    this.dataHoje = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.carregarBancos();
    this.carregarCategorias();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipo']) {
      this.filtrarCategorias();
    }
  }

  carregarBancos(): void {
    this.bancoService.listarBancos().subscribe((data) => {
      this.bancos = data;
    });
  }

  carregarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe((data) => {
      this.categorias = data;
      this.filtrarCategorias();
    });
  }

  filtrarCategorias(): void {
    if (this.tipo === 'transferencia') {
      this.categoriasFiltradas = [];
      return;
    }
    this.categoriasFiltradas = this.categorias.filter(
      (cat) => cat.tipo === this.tipo
    );
  }

  onClose(): void {
    this.close.emit();
  }

  salvarTransacao(form: NgForm): void {
    if (form.invalid) {
      console.error('Formulário inválido!');
      return;
    }
    if (!this.contaId) {
      alert('Erro: ID da conta do usuário não fornecido.');
      return;
    }

    const formValues = form.value;
    const valorNumerico = this.converterValorParaNumero(formValues.valor);

    const novaTransacao: NovaTransacao = {
      tipo: this.tipo!,
      valor: valorNumerico,
      data: formValues.data,
      categoria: formValues.categoria,
      bancoOrigem: formValues.bancoOrigem,
      bancoDestino: formValues.bancoDestino,
      conta: this.contaId,
    };

    this.transacoesService.criarTransacao(novaTransacao).subscribe({
      next: (response) => {
        alert(`Transação de ${this.tipo} criada com sucesso!`);
        this.transacaoSalva.emit();
        this.onClose();
      },
      error: (err) => {
        console.error('Erro ao criar transação:', err);
        alert(`Erro: ${err.error.message || 'Falha ao criar transação.'}`);
      },
    });
  }

  private converterValorParaNumero(valorString: string): number {
    if (!valorString) return 0;
    const valorLimpo = String(valorString)
      .replace('R$ ', '')
      .replace(/\./g, '')
      .replace(',', '.');
    return parseFloat(valorLimpo);
  }
}
