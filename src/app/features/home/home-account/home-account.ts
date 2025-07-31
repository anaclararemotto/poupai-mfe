import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  Usuario,
  UsuarioService,
} from '../../../core/services/usuario.service';
import { Subscription, filter } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-account.html',
  styleUrl: './home-account.scss',
})
export class HomeAccount implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  private tokenSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    console.group('HomeAccount OnInit');
    console.log('HomeAccount: ngOnInit chamado.');

    this.tokenSubscription = this.authService.currentToken$
      .pipe(filter((token) => !!token))
      .subscribe(() => {
        console.log(
          'DEBUG HomeAccount: Token no stream. Chamando a API para carregar dados do usuário.'
        );
        this.carregarDadosDoUsuario();
      });

    this.userSubscription = this.authService.currentUser$.subscribe(
      (usuario) => {
        this.usuario = usuario;
        if (usuario) {
          console.log(
            'DEBUG HomeAccount: Dados do usuário carregados com sucesso:',
            usuario.nome
          );
        } else {
          console.log(
            'DEBUG HomeAccount: Nenhuma informação de usuário disponível.'
          );
        }
      }
    );

    console.groupEnd();
  }

  private carregarDadosDoUsuario(): void {
    console.group('HomeAccount carregarDadosDoUsuario');
    console.log(
      'DEBUG HomeAccount: Tentando carregar dados do usuário logado via UsuarioService...'
    );

    this.usuarioService.getUsuarioLogado().subscribe({
      next: (usuario: Usuario) => {
        this.authService.setUser(usuario);
        console.groupEnd();
      },
      error: (error: HttpErrorResponse) => {
        console.error(
          'DEBUG HomeAccount: Erro ao carregar dados do usuário logado:',
          error
        );
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
        }
        console.groupEnd();
      },
    });
  }

  ngOnDestroy(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  adicionarConta() {
    console.log('HomeAccount: Botão "Adicionar conta" clicado!');
    this.router.navigate(['/contas/nova']);
  }

  sair() {
    console.log('HomeAccount: Botão "Sair" clicado!');
    this.authService.logout();
  }
}
