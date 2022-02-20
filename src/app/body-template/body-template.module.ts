import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { BodyTemplateComponent } from "./body-template.component";
import { CadastrarAtivosComponent } from "./cadastrar-ativos/cadastrar-ativos.component";
import { ListaFiisComponent } from "./lista-fiis/lista-fiis.component";

const routes: Routes = [
  {
    path: 'index', component: ListaFiisComponent
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
  ],
  providers: [],
  bootstrap: []
})
export class BodyModule { }
