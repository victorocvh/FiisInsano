import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css']
})
export class LoginSigninComponent implements OnInit {

  public user: Usuario = new Usuario();
  public loading = false;

  constructor(private fireAuthService: FirebaseAuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  doLogin() {
    this.loading = true;
    setTimeout(() => {
      this.fireAuthService.signin(this.user).then(res => {
        this.loading = false;
        this.router.navigateByUrl('h/home/index');
      }).catch(error => {
        this.loading = false;
      });
    },2000)
  }

}
