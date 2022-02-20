import { Component, OnInit } from '@angular/core';
import { CurrencyMaskDirective } from 'ng2-currency-mask';
import { Ativo } from '../lista-fiis/lista-fiis';
@Component({
  selector: 'app-cadastrar-ativos',
  templateUrl: './cadastrar-ativos.component.html',
  styleUrls: ['./cadastrar-ativos.component.css']
})
export class CadastrarAtivosComponent implements OnInit {

  public ativo : Ativo = new Ativo();
  constructor() { }

  ngOnInit(): void {
    console.log('ox');
  }

  onSubmit() {

  }

}
