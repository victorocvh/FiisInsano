import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Console } from 'console';
import * as moment from 'moment';
import { map } from 'rxjs';
import { StorageAuth } from '../models/storage-auth';
import { UserDB, Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public firebaseAuth : AngularFireAuth,
    private db: AngularFireDatabase,
    private route: Router) { }

  private isLoggedIn = false;

  async signin(user: Usuario) {
    await this.firebaseAuth.signInWithEmailAndPassword(user.email,user.password)
    .then(res => {
      localStorage.setItem(StorageAuth.uid, JSON.stringify(res.user?.uid));
      localStorage.setItem(StorageAuth.email, JSON.stringify(btoa(res.user?.email || '')));
      localStorage.setItem(StorageAuth.time, JSON.stringify(btoa(moment().toISOString())));
      this.isLoggedIn = true;
    })
  }

  async signup(user: Usuario) {
    await this.firebaseAuth.createUserWithEmailAndPassword(user.email,user.password)
    .then(res => {
      this.saveUserInformations(user);
      return res;
    })
  }

   async auth(email: string) : Promise<string[]> {
    let emailDecoded = atob(email);
    return await this.firebaseAuth.fetchSignInMethodsForEmail(emailDecoded).then(res => {
      debugger;
      return res;
    }).catch(res => {
      debugger;
      return [];
    })
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.clear();
    this.route.navigate(['']);
  }

  private saveUserInformations(user: Usuario) {
    debugger;
    this.db.list('users').push(new UserDB(user));
  }

}


