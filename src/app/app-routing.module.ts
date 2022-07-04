import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from './services/login-guard.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./login-template/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'h', loadChildren: () => import('./body-template/body-template.module').then(m => m.BodyModule),
  },
  {
    path: '95d8xad', loadChildren: () => import('./login-template/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
