import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { StorageAuth } from '../models/storage-auth';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private auth: FirebaseAuthService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let emailStorage = localStorage.getItem(StorageAuth.email) || undefined;
      let timeStorage = localStorage.getItem(StorageAuth.time) || undefined;
      let emailJsonParse = '';
      let timeJsonParse = '';
      debugger;
      // Se email ou time não estiver prenchido libera rota de login
      if (!emailStorage || !timeStorage) {
        return true;
      } else {
        // Se email e time estiver preenchido continua a validação para ver se usuário está logado
        try {
          emailJsonParse = JSON.parse(emailStorage);
          timeJsonParse = JSON.parse(timeStorage);

          this.auth.auth(emailJsonParse).then(res => {
            if (res.length >= 1) {
              debugger;
              console.log('res:: ', res);
              this.router.navigate(['h/home/index']);
              return false;
            }
            return true;
          }, error => {
            return true;
          })

        } catch {
          return true;
        }
      }

      return true;
  }

}
