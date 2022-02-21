import { Component, OnInit } from '@angular/core';
import { Ativo } from 'src/app/models/ativo';
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
      let array : Ativo[] = [];
      let somaTotalAtivos = 0;
      res.map(x => {
        let ativo = new Ativo(x.value, x.key);
        if (ativo) {
          array.push(ativo);
          somaTotalAtivos += ativo.atvValorTotal;
        }
      })

      console.log('somatotal: ', somaTotalAtivos);
      let porcentagem = 100/somaTotalAtivos;
      console.log('Porcentagem: ', porcentagem);
      array.forEach(ativo => {
        ativo.atvAlocacao = porcentagem * ativo.atvValorTotal;
      })

      this.listaAtivos = array;
      this.requestFiis();
    })


  }

  requestFiis() {
    // this.fiisService.get('SNCI11').then(x => {
    //   x.subscribe(res => {
    //     console.log('res::: ', res);
    //   })
    // })

  }

}
