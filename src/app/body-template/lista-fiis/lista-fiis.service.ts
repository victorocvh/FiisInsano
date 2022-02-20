import { Injectable } from '@angular/core';
import { Ativo } from './lista-fiis';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaFiisService {

  constructor(private db: AngularFireDatabase) {
  }

  insert(ativo: Ativo) {
    this.db.list('listaFiis').push(ativo)
    .then((result : any) => {
      console.log('Result: ', result);
    })
  }

  update (ativo: Ativo, key:string) {
    this.db.list('listaFiis').update(key, ativo)
    .catch(err => {
      console.log('Error: ', err);
    })
  }

  getAll () {
    this.db.list('listaFiis')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({key : c.payload.key, values: c.payload.val() }));
      })
    )
  }

  delete (key:string) {
    this.db.object(`contato/${key}`).remove();
  }

}
