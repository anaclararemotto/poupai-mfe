import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Banco, BancoService } from '../../core/services/banco.service';
import {
  Categoria,
  CategoriaService,
} from '../../core/services/categoria.service';
import {
  NovaTransacao,
  Transacao,
} from '../../core/services/transacoes.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-modal-edit',
  imports: [CommonModule, FormsModule, NgxMaskDirective, ReactiveFormsModule],
  providers: [],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.scss',
})
export class ModalEdit implements OnInit, OnChanges {
  @Input() show: boolean = false;
  @Input() transaction: Transacao | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<NovaTransacao> & { _id: string }>();

  editForm!: FormGroup;
  categorias: Categoria[] = []; 
  bancos: Banco[] = [];

  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private bancoService = inject(BancoService);

  private isFormInitialized: boolean = false;
  private dataLoaded: boolean = false; 

  ngOnInit(): void {
    this.editForm = this.fb.group({
      _id: [''],
      tipo: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01), Validators.max(5000)]],
      data: ['', Validators.required],
      categoria: [''],
      bancoOrigem: [''],
      bancoDestino: [''],
      conta: [''],
    });

    this.bancoService.listarBancos().subscribe({
      next: (data) => {
        this.bancos = data;
        console.log('ModalEdit: Bancos carregados:', this.bancos);
        this.dataLoaded = true;

        if (this.transaction) {
          this.patchFormWithTransaction(this.transaction);
        }
      },
      error: (err) => console.error('Erro ao carregar bancos', err)
    });

    this.isFormInitialized = true;
    console.log('ModalEdit: Formulário inicializado.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transaction'] && this.transaction && this.isFormInitialized) {
      console.log('ModalEdit: Transação recebida em ngOnChanges:', this.transaction);

      if (this.dataLoaded) { 
         this.patchFormWithTransaction(this.transaction);
      } else {
         console.warn('ModalEdit: Transação recebida antes dos dados base. Patch será feito após o carregamento dos bancos.');
      }
    }
  }

  private patchFormWithTransaction(transaction: Transacao): void {
    console.log('ModalEdit: Patching form with transaction data.');
    console.log('ModalEdit: Tipo da transação recebida (original):', transaction.tipo);

    const transactionType = (typeof transaction.tipo === 'string' && transaction.tipo !== null && transaction.tipo !== undefined)
                            ? transaction.tipo.toLowerCase().trim()
                            : ''; 

    if (transactionType === 'receita' || transactionType === 'despesa') {
      this.categoriaService.listarCategoriasPorTipo(transactionType).subscribe({
        next: (data) => {
          this.categorias = data;
          console.log(`ModalEdit: Categorias filtradas por tipo (${transactionType}):`, this.categorias);
          this.performFormPatch(transaction, transactionType);
        },
        error: (err) => console.error(`Erro ao carregar categorias para o tipo ${transactionType}`, err)
      });
    } else {
      this.categorias = []; 
      this.performFormPatch(transaction, transactionType);
    }
  }

  private performFormPatch(transaction: Transacao, transactionType: string): void {
    const categoriaValue = transaction.categoria instanceof Object && transaction.categoria !== null
                           ? transaction.categoria._id.toString() 
                           : (transaction.categoria as string || null);
    const bancoOrigemValue = transaction.bancoOrigem instanceof Object && transaction.bancoOrigem !== null
                             ? transaction.bancoOrigem._id.toString() 
                             : (transaction.bancoOrigem as string || null);
    const bancoDestinoValue = transaction.bancoDestino instanceof Object && transaction.bancoDestino !== null
                              ? transaction.bancoDestino._id.toString() 
                              : (transaction.bancoDestino as string || null);

    console.log('ModalEdit: Valor da categoria para patch:', categoriaValue);
    console.log('ModalEdit: Valor do bancoOrigem para patch:', bancoOrigemValue);
    console.log('ModalEdit: Valor do bancoDestino para patch:', bancoDestinoValue);

    this.editForm.patchValue({
      _id: transaction._id,
      tipo: transactionType,
      valor: transaction.valor,
      data: transaction.data ? new Date(transaction.data).toISOString().split('T')[0] : '',
      categoria: categoriaValue,
      bancoOrigem: bancoOrigemValue,
      bancoDestino: bancoDestinoValue,
      conta: transaction.conta
    });

    console.log('ModalEdit: Tipo após patchValue (limpo):', this.editForm.get('tipo')?.value);
    console.log('ModalEdit: Categoria após patchValue:', this.editForm.get('categoria')?.value);
    console.log('ModalEdit: Banco Origem após patchValue:', this.editForm.get('bancoOrigem')?.value);
    console.log('ModalEdit: Banco Destino após patchValue:', this.editForm.get('bancoDestino')?.value);

    this.updateFormFieldsVisibility(transactionType);
  }

  onTipoChange(): void {
    const tipo = this.editForm.get('tipo')?.value;
    console.log('ModalEdit: Tipo alterado pelo usuário (dropdown):', tipo);
    if (tipo === 'receita' || tipo === 'despesa') {
      this.categoriaService.listarCategoriasPorTipo(tipo).subscribe({
        next: (data) => {
          this.categorias = data;
          console.log(`ModalEdit: Categorias recarregadas para o tipo (${tipo}):`, this.categorias);
          this.updateFormFieldsVisibility(tipo); 
        },
        error: (err) => console.error(`Erro ao recarregar categorias para o tipo ${tipo}`, err)
      });
    } else {
      this.categorias = [];
      this.updateFormFieldsVisibility(tipo);
    }
  }

  private updateFormFieldsVisibility(tipo: string): void {
    const categoriaControl = this.editForm.get('categoria');
    const bancoOrigemControl = this.editForm.get('bancoOrigem');
    const bancoDestinoControl = this.editForm.get('bancoDestino');

    categoriaControl?.clearValidators();
    bancoOrigemControl?.clearValidators();
    bancoDestinoControl?.clearValidators();
    categoriaControl?.setValue(null); 
    bancoOrigemControl?.setValue(null);
    bancoDestinoControl?.setValue(null);

    if (tipo === 'receita') {
      bancoDestinoControl?.setValidators(Validators.required);
    } else if (tipo === 'despesa') {
      bancoOrigemControl?.setValidators(Validators.required);
      categoriaControl?.setValidators(Validators.required);
    } else if (tipo === 'transferencia') {
      bancoOrigemControl?.setValidators(Validators.required);
      bancoDestinoControl?.setValidators(Validators.required);
    }

    categoriaControl?.updateValueAndValidity();
    bancoOrigemControl?.updateValueAndValidity();
    bancoDestinoControl?.updateValueAndValidity();
  }

  onSave(): void {
    if (this.editForm.valid && this.transaction) {
      const formValue = this.editForm.value;
      const updatedTransaction: Partial<NovaTransacao> & { _id: string } = {
        _id: formValue._id,
        tipo: formValue.tipo,
        valor: formValue.valor,
        data: new Date(formValue.data).toISOString(),
        categoria: formValue.categoria || undefined,
        bancoOrigem: formValue.bancoOrigem || undefined,
        bancoDestino: formValue.bancoDestino || undefined,
        conta: this.transaction.conta
      };
      this.save.emit(updatedTransaction);
    } else {
      this.editForm.markAllAsTouched();
      console.error('Formulário inválido ou transação original não disponível!');
    }
  }

  onClose(): void {
    this.close.emit();
    this.editForm.reset();
  }
}
