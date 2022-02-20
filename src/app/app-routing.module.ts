import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './services/auth-guard.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./login-template/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'i', loadChildren: () => import('./body-template/body-template.module').then(m => m.BodyModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
