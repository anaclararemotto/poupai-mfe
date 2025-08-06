import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from '../../core/services/categoria.service';

@Component({
  selector: 'app-card-transactions',
  imports: [CommonModule, DatePipe],
  templateUrl: './card-transactions.html',
  styleUrl: './card-transactions.scss',
})
export class CardTransactions {
  @Input() transaction: any;
  @Output() edit = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  categorias: Categoria[] = [];
  previewUrl: string | null = null;

  modalOpen = false;
  modalImgSrc: string | null = null;

  constructor(private http: HttpClient) {}

  onEdit() {
    this.edit.emit(this.transaction);
  }

  onViewClick(): void {
    this.view.emit(this.transaction);
  }

  onDelete() {
    this.delete.emit(this.transaction);
  }

  getIconClass(tipo: string): string {
    switch (tipo) {
      case 'receita':
        return 'bi-arrow-up';
      case 'despesa':
        return 'bi-arrow-down';
      case 'transferencia':
        return 'bi-arrow-left-right';
      default:
        return 'bi-question-circle';
    }
  }

  getNomeCategoria(id: string): string {
    const cat = this.categorias.find((c) => c._id === id);
    return cat ? cat.nome : '';
  }

  getBancoDisplay(transaction: any): string {
    if (transaction.tipo === 'transferencia') {
      return `${transaction.bancoOrigem?.nome || ''} → ${
        transaction.bancoDestino?.nome || ''
      }`;
    }

    const nomeCategoria = transaction.categoria?.nome || '';

    if (transaction.tipo === 'receita') {
      return `${transaction.bancoDestino?.nome || ''} | ${nomeCategoria}`;
    }
    if (transaction.tipo === 'despesa') {
      return `${transaction.bancoOrigem?.nome || ''} | ${nomeCategoria}`;
    }

    return '';
  }

  formatarValor(valor: number): string {
    if (valor == null) return '';
    return valor.toFixed(2).replace('.', ',');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('transacaoId', this.transaction._id);

    this.http
      .post<{ imgPath: string }>('http://localhost:4000/upload', formData)
      .subscribe({
        next: (res) => {
          console.log('Imagem salva:', res.imgPath);
          this.transaction.imgPath = res.imgPath;
        },
        error: (err) => console.error('Erro no upload', err),
      });
  }

  getImageUrl(imgPath: string): string {
    if (!imgPath) return '';
    return imgPath ? `http://localhost:4000/${imgPath}` : '';
  }

  openModal(imgPath: string) {
    this.modalImgSrc = this.getImageUrl(imgPath);
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.modalImgSrc = null;
  }
}
