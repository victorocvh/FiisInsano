import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginTemplateComponent } from './login-template.component';
import { LoginInitialComponent } from './login-initial/login-initial.component';
import { LoginSigninComponent } from './login-signin/login-signin.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


var routes: Routes = [
  {
    path: '', component: LoginTemplateComponent,
    children: [
      {
        path: '', component: LoginInitialComponent
      },
      {
        path: 'login', component: LoginSigninComponent
      },
      {
        path: 'cadastro', component: LoginSignupComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    LoginInitialComponent,
    LoginSigninComponent,
    LoginSignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
