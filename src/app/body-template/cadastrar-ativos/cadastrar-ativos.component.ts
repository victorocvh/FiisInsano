import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { CurrencyMaskDirective } from 'ng2-currency-mask';
import { Ativo, TipoAtvEnum } from 'src/app/models/ativo';
import { AtivosService } from 'src/app/services/ativos.service';

@Component({
  selector: 'app-cadastrar-ativos',
  templateUrl: './cadastrar-ativos.component.html',
  styleUrls: ['./cadastrar-ativos.component.css']
})
export class CadastrarAtivosComponent implements OnInit {

  public ativo : Ativo = new Ativo(null,null);
  constructor(private ativosService: AtivosService) { }

  ngOnInit(): void {
    console.log('ox');
  }

  onSubmit() {
    this.ativosService.insert(this.ativo);
  }

  public get TipoAtvEnum(): typeof TipoAtvEnum {
    return TipoAtvEnum;
  }
}
