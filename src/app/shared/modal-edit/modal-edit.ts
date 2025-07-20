import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ApiService } from '../../core/services/api.service';
import {
  Categoria,
  CategoriaService,
} from '../../core/services/categoria.services';

@Component({
  selector: 'app-modal-edit',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.scss',
})
export class ModalEdit implements OnInit {
  @Input() show = false;
  @Input() tipo: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Input() transacaoId!: string;
  @Input() transaction: any = null;

  selectedTransaction: any = null;

  banks: any[] = [];
  categorias: Categoria[] = [];

  constructor(
    private apiService: ApiService,
    private categoriaService: CategoriaService
  ) {}

 ngOnInit() {
  let bancosCarregados = false;
  let categoriasCarregadas = false;

  const montarTransacao = () => {
    if (bancosCarregados && categoriasCarregadas && this.transaction) {
      this.selectedTransaction = {
        ...this.transaction,
        bancoOrigem: this.transaction.bancoOrigem?._id ?? null,
        bancoDestino: this.transaction.bancoDestino?._id ?? null,
        categoria: this.transaction.categoria?._id ?? null,
        valor: Number(this.transaction.valor).toFixed(2),
        data: this.formatDate(this.transaction.data),
      };
    }
  };

  this.apiService.getBanks().subscribe((res) => {
    this.banks = res;
    bancosCarregados = true;
    montarTransacao();
  });

  this.categoriaService.listarCategorias().subscribe({
    next: (cats) => {
      if (this.tipo === 'despesa') {
        this.categorias = cats.filter((cat) => cat.tipo === 'despesa');
      } else if (this.tipo === 'receita') {
        this.categorias = cats.filter((cat) => cat.tipo === 'receita');
      } else {
        this.categorias = cats;
      }

      categoriasCarregadas = true;
      montarTransacao();
    },
    error: (err) => console.error('Erro ao carregar categorias', err),
  });
}


  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(d.getDate()).padStart(2, '0')}`;
  }

  onClose() {
    this.close.emit();
  }
}
