import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Console, debug } from 'console';
import { initializeApp } from 'firebase/app';
import { map } from 'rxjs';
import { getFirestore, collection, doc, getDocs, Firestore, where, query, setDoc, addDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Ativo, AtivoDB } from '../models/ativo';
import { StorageAuth } from '../models/storage-auth';
import { deepCopy } from '@firebase/util';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AtivosService {

  private app : any;
  private db : any;

  constructor(
    private firestore: AngularFirestore,
    private auth : AngularFireAuth) {
      this.app = initializeApp(environment.firebase);
      this.db = getFirestore(this.app);
    }

    public async getFiis() {
      console.log('hi');
      const fiis = collection(this.db, 'ativos')
      let authId = JSON.parse(localStorage.getItem(StorageAuth.uid) || '');
      const q = query(fiis, where("uid", "==", authId))
      const fiisSnapshot = await getDocs(q);
      const fiisList = fiisSnapshot.docs.map(doc => {
          let obj = new Ativo(null, doc.id);
          obj.atvCod = doc.data()['atvCod'];
          obj.atvPrecoAtual = doc.data()['atvPrecoAtual'];
          obj.atvTipo = doc.data()['atvTipo'];
          obj.atvQuantidade = doc.data()['atvQuantidade'];
          obj.dataCompra = doc.data()['dataCompra'];
          return obj;
      });
      return fiisList as Ativo[]
    }

    public async addAtivo(ativo: Ativo) {
      let ativoDB = new AtivoDB(ativo);
      console.log('ativo:', ativo);
      let authId = JSON.parse(localStorage.getItem(StorageAuth.uid) || '');
      ativoDB.uid = authId;
      console.log(Object.assign({}, ativoDB));
      const docRef = await addDoc(collection(this.db, 'ativos'), Object.assign({},ativoDB));
    }





    // .pipe(
    //   map(changes => {
    //     return changes.map(c => ({key: c.payload.key, value: c.payload.val()}))
    //   }),
    // )
  }


