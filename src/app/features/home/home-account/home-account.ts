
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; // Importe seu AuthService
import { Usuario, UsuarioService } from '../../../core/services/usuario.service';


@Component({
  selector: 'app-home-account',
  standalone: true,
  imports: [
    CommonModule
  ],
  // O UsuarioService já tem providedIn: 'root', mas se houver algum problema
  // e ele estiver em um MFE diferente, você pode precisar listá-lo aqui.
  // providers: [UsuarioService], // Normalmente não é necessário se providedIn: 'root'
  templateUrl: './home-account.html',
  styleUrl: './home-account.scss'
})
export class HomeAccount implements OnInit {

  usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService, // Injete o UsuarioService
    private authService: AuthService // Injete o AuthService
  ) { }

  ngOnInit(): void {
    this.carregarUsuarioLogado();
  }

  carregarUsuarioLogado() {
    // Verifica primeiro se há um usuário logado (seja pelo token ou por alguma flag)
    if (!this.authService.isLoggedIn()) {
      console.error('Usuário não autenticado. Redirecionando para o login.');
      this.router.navigate(['/login']);
      return;
    }

    console.log('Tentando carregar dados do usuário logado...');
    
    // Chama o novo método que busca diretamente o usuário logado
    this.usuarioService.getUsuarioLogado().subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        console.log('Usuário logado:', this.usuario.nome);
      },
      error: (error) => {
        console.error('Erro ao carregar dados do usuário logado:', error);
        this.usuario = { _id: '', nome: 'Erro ao carregar', email: '', senha: '' }; 
        // Em caso de erro (ex: token inválido/expirado, erro de servidor), deslogar o usuário
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  adicionarConta() {
    console.log('Botão "Adicionar conta" clicado!');
    this.router.navigate(['/contas/nova']);
  }

  sair() {
    console.log('Botão "Sair" clicado!');
    this.authService.logout(); // Chama o logout do AuthService
    this.router.navigate(['/login']);
  }
}