import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { FirebaseAuthService } from "./firebase-auth.service";


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
      return true
      // let emailValue = JSON.parse(localStorage.getItem(StorageAuth.email) || '') as string;
      // let timeValue = JSON.parse(localStorage.getItem(StorageAuth.time) || '') as string;

      // if (emailValue && timeValue && emailValue != '' && timeValue != '') {

      //   let decodedTime = moment(atob(timeValue));
      //   let x = this.auth.auth(emailValue)
      //   console.log('xx: ', x);

      //   var diff = moment(moment(),"DD/MM/YYYY HH:mm:ss").diff(moment(decodedTime,"DD/MM/YYYY HH:mm:ss"));
      //   var dias = moment.duration(diff).asDays();

      //   if (dias >= 1) {
      //     localStorage.clear();
      //     this.router.navigateByUrl('/95d8xad');
      //     return true;
      //   }

      //   return true;
      // }

      // return false;
  }

}
