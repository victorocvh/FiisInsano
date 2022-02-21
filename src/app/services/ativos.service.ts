import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { debug } from 'console';
import { map } from 'rxjs';
import { Ativo, AtivoDB } from '../models/ativo';
import { StorageAuth } from '../models/storage-auth';

@Injectable({
  providedIn: 'root'
})
export class AtivosService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list<Ativo>('ativos')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({key: c.payload.key, value: c.payload.val()}))
      }),
    )
  }

  insert(ativo: Ativo) {
    let ativoDB = new AtivoDB(ativo);
    ativoDB.uid = JSON.parse(localStorage.getItem(StorageAuth.uid) || '');
    this.db.list('ativos').push(ativoDB);
  }

  delete() {

  }

}
