import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import * as moment from 'moment';
import { Ativo } from 'src/app/models/ativo';
import { FiiDB } from 'src/app/models/fii-db';
import { StorageAuth } from 'src/app/models/storage-auth';
import { AtivosService } from 'src/app/services/ativos.service';
import { FiisService } from 'src/app/services/fiis.service';
import { ModalNewativoComponent } from 'src/app/shared/modal-newativo/modal-newativo.component';
import { environment } from 'src/environments/environment';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-lista-fiis',
  templateUrl: './lista-fiis.component.html',
  styleUrls: ['./lista-fiis.component.css']
})
export class ListaFiisComponent implements OnInit {

  public listaAtivos: Ativo[] = [];
  public fiisDB: FiiDB[] = [];

  constructor(private ativoService: AtivosService,
    private dialog: MatDialog,
    private fiisService: FiisService) { }

  ngOnInit(): void {
    debugger;
    this.ativoService.getFiis().then((res) => {
      console.log('RES:: ', res);
      let somaAtivoTotal = res.map(atv => atv.atvQuantidade * atv.atvPrecoAtual)
      .reduce((av1,av2) => av1 + av2, 0);
      let ativosArray: Ativo[] = []
      let listOfFiis = res.map(atv => atv.atvCod);
      let listOfUniquesFiis = [...new Set(listOfFiis)];

      listOfUniquesFiis.forEach(fiiUni => {
        let ativo = new Ativo(null,null);
        let findAtv = res.filter(x => x.atvCod == fiiUni);

        if (findAtv) {
          ativo.atvCod = fiiUni;
          ativo.atvPrecoMedio = findAtv.map(atv => atv.atvPrecoAtual * atv.atvQuantidade).reduce((a,b) => a+b,0) / findAtv.map(atv => atv.atvQuantidade).reduce((a,b) => a+b,0);
          ativo.atvAlocacao = (ativo.atvPrecoMedio * findAtv.map(atv => atv.atvQuantidade).reduce((a,b) => a+b,0) / somaAtivoTotal) * 100;
          ativo.atvQuantidade = findAtv.map(atv => atv.atvQuantidade).reduce((a,b) => a+b,0);
          ativo.atvValorTotal = ativo.atvQuantidade * ativo.atvPrecoMedio;
        }
        ativosArray.push(ativo);
      });

      this.fiisService.fiiDbList().then((res : FiiDB[]) => {
        console.log('res db: ', res);
        ativosArray.forEach(a => {
          console.log('ATIVOS ARRAY: ', ativosArray)
          let ativo = res.find(x => x.CodAtivo == a.atvCod);
          console.log('ATIVO:: ', ativo);
          if (ativo) {
            a.atvPrecoMercado = Number(ativo.PrecoAtual.replace(',','.').replace('R$ ',''));
          }
        })
        this.listaAtivos = ativosArray;
      });


    })
  }


  private ajusteArray(array : any) {
    console.log('FiiDb:: ', this.fiisDB);
    console.log('array:: ', array);
    array.forEach((ativo: Ativo) => {
      let findFii = this.fiisDB.find((x:any) => x.CodAtivo.toLocaleLowerCase() == ativo.atvCod.toLocaleLowerCase())

      if (findFii) {
        ativo.atvPrecoAtual =  Number(findFii.PrecoAtual.toString().replace(',','.'))
      }
    });
    this.listaAtivos = array;
  }

  public cadastrarAtivos() {
    console.log(window.innerWidth)

    this.fiisService.fiiDbList().then((res : FiiDB[]) => {
      this.fiisDB = res;

      let dialogNewAtivo = this.dialog.open(ModalNewativoComponent, {
        width: window.innerWidth <= 576 ? '100vw' : '100vw',
        maxWidth: '100%',
        height: 'auto',
        panelClass: 'modal-style',
        data: {
          fiisDB: this.fiisDB
        }
      });
    })

  }

}
