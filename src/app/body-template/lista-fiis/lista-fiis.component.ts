import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Ativo } from 'src/app/models/ativo';
import { StorageAuth } from 'src/app/models/storage-auth';
import { AtivosService } from 'src/app/services/ativos.service';
import { FiisService } from 'src/app/services/fiis.service';

@Component({
  selector: 'app-lista-fiis',
  templateUrl: './lista-fiis.component.html',
  styleUrls: ['./lista-fiis.component.css']
})
export class ListaFiisComponent implements OnInit {

  public listaAtivos: Ativo[] = [];

  constructor(private ativoService: AtivosService,
    private fiisService: FiisService) { }

  ngOnInit(): void {
    this.ativoService.getAll().subscribe(res => {
      debugger;
      let array : Ativo[] = [];
      let somaTotalAtivos = 0;
      res.map(x => {
        let ativo = new Ativo(x.value, x.key);
        if (ativo) {
          array.push(ativo);
          somaTotalAtivos += ativo.atvValorTotal;
        }
      })

      let porcentagem = 100/somaTotalAtivos;
      array.forEach(ativo => {
        ativo.atvAlocacao = porcentagem * ativo.atvValorTotal;
      })


      this.requestFiis(array);
    })


  }

  requestFiis(array : any) {
    debugger;
    let valueStorage = localStorage.getItem(StorageAuth.timeRequestFiiService);
    let timeRequest : any;
    let doRequest = false;

    if (valueStorage) timeRequest = JSON.parse(valueStorage) as object;
    if (!valueStorage) doRequest = true;

    if (timeRequest) {
      let timeAntes = moment(timeRequest.time);
      let timeNow = moment();

      var minutos = timeNow.diff(timeAntes, 'minutes')
      if (minutos >= 10) doRequest = true;
    }


    if (doRequest) {

      let ativosName: string[] = [];

      array.forEach((atv: any) => {
        ativosName.push(atv.atvCod);
      })

      this.fiisService.getByTicker(ativosName).subscribe((res : any) => {
        let obj = {
          'time' : moment(),
          'values' : res
        };

        res.forEach((i: string[]) => {
          let ativo = array.find((y:any) => y.atvCod == i[0]);
          if (ativo)
            ativo.atvPrecoAtual = Number(i[1]);
        });

        localStorage.setItem(StorageAuth.timeRequestFiiService, JSON.stringify(obj));
      })
      this.listaAtivos = array;
    } else {
      timeRequest.values.forEach((x: string[]) => {
        debugger;
        let ativo = array.find((y:any) => y.atvCod == x[0]);

        if (ativo) {
          ativo.atvPrecoAtual = Number(x[1].replace(',','.'));
        }
        this.listaAtivos = array;
      });
    }




  }

}
