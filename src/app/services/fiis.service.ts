import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, Firestore, getDocs, getFirestore, doc } from 'firebase/firestore';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { FiiDB } from '../models/fii-db';
@Injectable({
  providedIn: 'root'
})
export class FiisService {

  private app : any;
  private db : any;
  public fiisDB: FiiDB[] = [];

  constructor(private http: HttpClient) {
    this.app = initializeApp(environment.firebase);
    this.db = getFirestore(this.app);
  }

  getAll() {
   return this.http.get<FiiDB[]>(environment.herokuApi + 'getfiis', {
     headers: new HttpHeaders({
      'User-Agent': '*',
      'Access-Control-Allow-Origin' : '*',
      'Content-Type' : 'text/html'
     })
   });
  }

  async getFiisFromFirestore() {
    const fiis = collection(this.db, 'ativos-request');
    const fiisSnapshot = await getDocs(fiis);
    const fiiObject = fiisSnapshot.docs.map(x => {
      return { 'docid': x.id, 'docvalue': x.data()}
    })

    if (fiiObject && fiiObject.length > 0)
      return fiiObject[0];
    else
      return null;
  }

  async deleteDoc(docId: string) {
    let document = doc(this.db, 'ativos-request/'+ docId);
    await deleteDoc(document);
  }

  public async addFiisToFirestore(obj : any) {
    obj.values = Object.assign({}, obj.values);
    const docRef = await addDoc(collection(this.db, 'ativos-request'), Object.assign({}, obj));
  }

  getByTicker(ativos: string[]) {
    return this.http.get(environment.herokuApi + 'getfiibyticket?tickerid=' + ativos.join(','), {
      headers: new HttpHeaders({
        'User-Agent': '*',
        'Access-Control-Allow-Origin' : '*',
        'Content-Type' : 'text/html'
       })
    })
  }

  // Método retorna uma lista de fiidb
  public async fiiDbList() : Promise<any> {
    return this.getFiisFromFirestore().then(res => {
      // Verificar o time
      if (res != null) {
        this.fiisDB = res.docvalue['values'];
        let time = moment(res.docvalue['time']);
        let timeNow = moment();
        let diff = timeNow.diff(time, 'minutes');
        let minutesForNextCall = res.docvalue['minutesForNextCall'];

        // Deletar os fiis da tabela (ativos-request) e fazer requisição adicionando novamente.
        if (diff >= minutesForNextCall) {
            this.deleteDoc(res.docid);

            this.getAll().subscribe(resFii => {

              let object = {
                time: moment().toISOString(),
                values: resFii,
                minutesForNextCall: (Math.floor(Math.random() * 6) + 10).toString()
              }

              this.addFiisToFirestore(object);
              let newFiiDB : FiiDB[] = [];
              Object.keys(res.docvalue['values']).forEach(e => {
                var obj : FiiDB = new FiiDB()
                obj.CodAtivo = res.docvalue['values'][e][0]
                obj.PrecoAtual = res.docvalue['values'][e][2]
                obj.Segmento = res.docvalue['values'][e][1]

                newFiiDB.push(obj);
              })

              this.fiisDB = newFiiDB;
              return this.fiisDB;
          })

        } else {
          // Está ok...
          let newFiiDB : FiiDB[] = [];

          Object.keys(res.docvalue['values']).forEach(e => {
            var obj : FiiDB = new FiiDB()
            obj.CodAtivo = res.docvalue['values'][e][0]
            obj.PrecoAtual = res.docvalue['values'][e][2]
            obj.Segmento = res.docvalue['values'][e][1]

            newFiiDB.push(obj);
          })
          this.fiisDB = newFiiDB;
          return this.fiisDB;
        }

      } else {
        // Fazer requisição dos fiis.
        this.getAll().subscribe(resFii => {
            this.fiisDB = resFii;
            let object = {
              time: moment().toISOString(),
              values: resFii,
              minutesForNextCall: (Math.floor(Math.random() * 6) + 10).toString()
            }

            this.addFiisToFirestore(object);
            return this.fiisDB;
        })
      }

      return [];
    });
  }


}
