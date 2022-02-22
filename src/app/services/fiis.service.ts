import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FiisService {

  constructor(private http: HttpClient) { }

  get(ativosName: string[]) {
   return this.http.get(environment.herokuApi + 'getfiis', {
     headers: new HttpHeaders({
      'User-Agent': '*',
      'Access-Control-Allow-Origin' : '*',
      'Content-Type' : 'text/html'
     })
   });
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

}
