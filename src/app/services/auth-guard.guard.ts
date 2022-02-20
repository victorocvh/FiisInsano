import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { time } from 'console';
import * as moment from 'moment';
import { decode } from 'querystring';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { StorageAuth } from '../models/storage-auth';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  /**
   *
   */
  constructor(private auth: FirebaseAuthService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let emailValue = JSON.parse(localStorage.getItem(StorageAuth.email) || '') as string;
      let timeValue = JSON.parse(localStorage.getItem(StorageAuth.time) || '') as string;

      if (emailValue && timeValue && emailValue != '' && timeValue != '') {
        let decodedTime = moment(atob(timeValue));
        let x = this.auth.auth(emailValue)
        console.log('xx: ', x);

        this.router.navigate(['i/index']);
        return true;
      }

      return false;
  }

}
