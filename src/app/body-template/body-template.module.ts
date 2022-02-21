import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { HeaderTemplateComponent } from "../header-template/header-template.component";
import { AuthGuardGuard } from "../services/auth-guard.guard";
import { FiisService } from "../services/fiis.service";
import { BodyTemplateComponent } from "./body-template.component";
import { CadastrarAtivosComponent } from "./cadastrar-ativos/cadastrar-ativos.component";
import { ListaFiisComponent } from "./lista-fiis/lista-fiis.component";

const routes: Routes = [
  {
    path: 'home', component: BodyTemplateComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: 'index', component: ListaFiisComponent
      },
      {
        path: 'cadastrar-ativos', component: CadastrarAtivosComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    ListaFiisComponent,
    CadastrarAtivosComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: []
})
export class BodyModule { }
