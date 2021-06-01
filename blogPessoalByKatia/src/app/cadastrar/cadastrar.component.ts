import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User // as variaves sempre são declaradas em cima dos construtores
  confirmarSenha: string
  tipoUsuario: string

  constructor( //tudo que colocamos dentro do contrutor é injeção de dependencia
    private authService: AuthService, //metodo de cadastrar depende do meu AuthService
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0) //colocamos isso nas paginas por padrão
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      alert('As senhas estão incorretas.')
    } else { //subscribe = assim ele vai subescrever o meu objeto ts e transforma-lo em objeto json // vai enviar para rota entrar
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp 
        this.router.navigate(['/entrar']) 
        alert('Usuário cadastrado com sucesso!')
      }) 
    }
  }
}
