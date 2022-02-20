import { Component, OnInit } from '@angular/core';
import { Ativo } from './lista-fiis';
import { ListaFiisService } from './lista-fiis.service';

@Component({
  selector: 'app-lista-fiis',
  templateUrl: './lista-fiis.component.html',
  styleUrls: ['./lista-fiis.component.css']
})
export class ListaFiisComponent implements OnInit {

  public listaAtivos: Ativo = new Ativo();

  constructor(private listaService: ListaFiisService) { }

  ngOnInit(): void {
    console.log('ox');
  }

}
