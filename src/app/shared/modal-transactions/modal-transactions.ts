import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { finalize } from 'rxjs';
import { Banco, BancoService } from '../../core/services/banco.service';
import {
  Categoria,
  CategoriaService,
} from '../../core/services/categoria.service';
import {
  NovaTransacao,
  TransacoesService,
} from '../../core/services/transacoes.service';

@Component({
  selector: 'app-modal-transactions',
  standalone: true,
  imports: [CommonModule,  FormsModule, NgxMaskDirective],
  templateUrl: './modal-transactions.html',
  styleUrls: ['./modal-transactions.scss'],
})
export class ModalTransactions implements OnInit, OnChanges {
  @Input() show = false;
  @Input()   tipo: 'receita' | 'despesa' | 'transferencia' | null = null;

  @Input() contaId!: string;
@Input() bancos: Banco[] = [];
  @Input() categoriasFiltradas: Categoria[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() transacaoSalva = new EventEmitter<void>();

  dataHoje: string;
  categorias: Categoria[] = [];

  isSaving = false;
  message: string | null = null;
  isError = false;
private formatDateToInput(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  constructor(
    private transacoesService: TransacoesService,
    private bancoService: BancoService,
    private categoriaService: CategoriaService,

  ) {
this.dataHoje = this.formatDateToInput(new Date());  }

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


salvarTransacao(form: NgForm) {
  if (!this.tipo) {
    console.error('Tipo da transação não definido');
    return;
  }

  if (form.valid) {
    this.isSaving = true;
    this.message = null;
    this.isError = false;

    let payload: NovaTransacao;
    const commonPayload = {
      valor: this.parseValor(form.value.valor),
      data: new Date().toISOString(),
      conta: this.contaId,
      tipo: this.tipo,
    };

    switch (this.tipo) {
      case 'receita':
        payload = {
          ...commonPayload,
          categoria: form.value.categoria,
          bancoDestino: form.value.bancoDestino,
        };
        break;

      case 'despesa':
        payload = {
          ...commonPayload,
          categoria: form.value.categoria,
          bancoOrigem: form.value.bancoOrigem,
        };
        break;

      case 'transferencia':
        payload = {
          ...commonPayload,
          bancoOrigem: form.value.bancoOrigem,
          bancoDestino: form.value.bancoDestino,
        };
        break;

      default:
        console.error('Tipo de transação inválido');
        this.isSaving = false;
        return;
    }

    console.log('Payload enviado:', payload);

    this.transacoesService.criarTransacao(payload)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.message = 'Transação criada com sucesso!';
          this.isError = false;
          form.resetForm();
          this.transacaoSalva.emit();
          setTimeout(() => this.onClose(), 2000);
        },
        error: (err) => {
          this.message = 'Erro ao criar transação. Por favor, tente novamente.';
          this.isError = true;
          console.error('Erro ao criar transação', err);
        },
      });
  }
}




  private parseValor(valorComMascara: string): number {
    if (!valorComMascara) return 0;
    return Number(
      valorComMascara
        .replace('R$ ', '')
        .replace(/\./g, '')
        .replace(',', '.')
    );
  }
}
