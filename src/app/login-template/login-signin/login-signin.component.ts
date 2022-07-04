import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ativo } from 'src/app/models/ativo';
import { FiiDB } from 'src/app/models/fii-db';
import { Usuario } from 'src/app/models/usuario';
import { AtivosService } from 'src/app/services/ativos.service';
import { FiisService } from 'src/app/services/fiis.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ModalWarnComponent } from 'src/app/shared/modal-warn/modal-warn.component';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css']
})
export class LoginSigninComponent implements OnInit {

  public user: Usuario = new Usuario();
  public loading = false;
  listaAtivos: Ativo[] = [];

  constructor(private fireAuthService: FirebaseAuthService,
    private router: Router,
    private dialog: MatDialog,
    private fiisService: FiisService,
    private ativoService: AtivosService,) { }

  ngOnInit(): void {
  }

  doLogin() {
    this.loading = true;
    setTimeout(() => {
      this.fireAuthService.signin(this.user).then(res => {
        console.log('RES:: ', res);
        this.loading = false;


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

          this.router.navigateByUrl('h/home/index');
        })




      }).catch(error => {
        this.loading = false;
        this.dialog.open(ModalWarnComponent, {
          width: '700px',
          height: 'auto',
          panelClass: 'modal-style',
          data: {
            title: 'Não foi possível efetuar seu login!',
            text: 'Senha incorreta ou usuário não existe',
            button: 'OK'
          }
        })
      });
    },2000)
  }

}
