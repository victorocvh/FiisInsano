import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Ativo, TipoAtvEnum } from 'src/app/models/ativo';
import { FiiDB } from 'src/app/models/fii-db';
import { AtivosService } from 'src/app/services/ativos.service';
import { FiisService } from 'src/app/services/fiis.service';
import { ModalWarnComponent } from '../modal-warn/modal-warn.component';

@Component({
  selector: 'app-modal-newativo',
  templateUrl: './modal-newativo.component.html',
  styleUrls: ['./modal-newativo.component.css']
})
export class ModalNewativoComponent implements OnInit {

  public ativo : Ativo = new Ativo(null,null);
  public dataSelecionada: moment.Moment;
  public fiisDB : FiiDB[] = [];
  public selectedFii: string = '';
  public showQtdError: boolean;
  public showMoneyError: boolean;
  showAtivoError: boolean;

  constructor(private ativosService: AtivosService,
    private dialogRef : MatDialogRef<ModalNewativoComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private fiisService: FiisService) { }

  ngOnInit(): void {
    this.ativo.dataCompra = moment();

    if (this.data && this.data.fiisDB) {
      this.fiisDB = this.data.fiisDB;
    }
  }

  onSubmit() {
    this.ativo.atvTipo = 0;
    console.log('ativo::', this.ativo);

    if (this.ativo.atvCod == '' || this.ativo.atvCod == null) {
      this.showAtivoError = true;
    } else {
      this.showAtivoError = false;
    }

    if (this.ativo.atvQuantidade <= 0) {
      this.showQtdError = true;
    } else {
      this.showQtdError = false;
    }

    if (this.ativo.atvPrecoAtual <= 0) {
      this.showMoneyError = true;
    } else {
      this.showMoneyError = false;
    }

    if (this.showAtivoError || this.showMoneyError || this.showQtdError) return;

    this.ativosService.addAtivo(this.ativo)
    .then(_ => {
      this.dialog.open(ModalWarnComponent, {
        width: '700px',
        height: 'auto',
        panelClass: 'modal-style',
        data: {
          title: 'Irrul!! Seu ativo foi cadastrado com sucesso. :)',
          text: '',
          button: 'OK'
        }
      })
      this.ativo = new Ativo(null,null);
    })
    .catch(_ => {
      this.dialog.open(ModalWarnComponent, {
        width: '700px',
        height: 'auto',
        panelClass: 'modal-style',
        data: {
          title: 'OOps!! Seu ativo não foi cadastrado. :(',
          text: 'Por algum motivo seu ativo não foi cadastrado! Tente mais tarde.',
          button: 'OK'
        }
      })
    })
  }

  check() {
    console.log('date ',this.dataSelecionada)
  }

  dateClass = (d: Date) => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : undefined;
  }

  public get TipoAtvEnum(): typeof TipoAtvEnum {
    return TipoAtvEnum;
  }

  close() {
    this.dialogRef.close(false);
  }

  verifyMobile() {
    // Verifica se a resolução ta + pra mobile do q pra desktop.
    if (window.innerWidth  <= 576) return true;
    return false;
  }

  verifyDesktop() {
    if (window.innerWidth >= 577) return true;
    return false;
  }

}
