import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  public user: Usuario = new Usuario();
  public loading = false;
  public canChangeLoading = false;
  public userForm: FormGroup;
  public signupBtnClicked = false;
  public sucessSignup = false;
  public failedSignup = false;

  constructor(private fireAuthService: FirebaseAuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.user.password,[
        Validators.required,
        Validators.minLength(6)
      ]),
      name: new FormControl(this.user.nome, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  get name() { return this.userForm.get('name')}

  get password() { return this.userForm.get('password')}

  get email() { return this.userForm.get('email')}

  doSignup() {
    this.user.email = this.email?.value;
    this.user.nome = this.name?.value;
    this.user.password = this.password?.value;

    this.loading = true;
    setTimeout(() => {
      this.fireAuthService.signup(this.user)
      .then(_ => {
        this.loading = false;
        this.signupBtnClicked = true;
        this.sucessSignup = true;
      }).catch(_ => {
        this.loading = false;
        this.signupBtnClicked = true;
        this.failedSignup = true;
      });
    }, 2000)
  }

}
