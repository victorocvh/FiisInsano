import { Component, OnInit } from '@angular/core';
import { Ativo } from 'src/app/models/ativo';
import { FiiDB } from 'src/app/models/fii-db';
import { AtivosService } from 'src/app/services/ativos.service';
import { FiisService } from 'src/app/services/fiis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public listaAllFiis : FiiDB[] = [];
  public listaAtivosUser : Ativo[] = [];

  constructor(private fiisService: FiisService,
    private ativosService: AtivosService) { }

  ngOnInit(): void {
    this.ativosService.getFiis().then(res => {
      this.listaAtivosUser = res;
    })

    this.fiisService.fiiDbList().then(res => {
      this.listaAllFiis = res;
      this.montaGrafico();
    })
  }

  public montaGrafico() {

  }

}
