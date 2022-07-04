import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ModalWarnComponent } from 'src/app/shared/modal-warn/modal-warn.component';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css']
})
export class LoginSigninComponent implements OnInit {

  public user: Usuario = new Usuario();
  public loading = false;

  constructor(private fireAuthService: FirebaseAuthService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  doLogin() {
    this.loading = true;
    setTimeout(() => {
      this.fireAuthService.signin(this.user).then(res => {
        console.log('RES:: ', res);
        this.loading = false;
        this.router.navigateByUrl('h/home/index');
      }).catch(error => {
        this.loading = false;
        this.dialog.open(ModalWarnComponent, {
          width: '700px',
          height: 'auto',
          panelClass: 'modal-style',
          data: {
            title: 'Não foi possível efetuar seu login!',
            text: 'Senha incorreta ou usuário não existe',
            button: 'OK'
          }
        })
      });
    },2000)
  }

}
