import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { HeaderTemplateComponent } from "../header-template/header-template.component";

import { FiisService } from "../services/fiis.service";
import { BodyTemplateComponent } from "./body-template.component";
import { ListaFiisComponent } from "./lista-fiis/lista-fiis.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { SharedModule } from "../shared/shared.module";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from "../services/auth-guard.guard";

const routes: Routes = [
  {
    path: 'home', component: BodyTemplateComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: 'index', component: ListaFiisComponent
      },
      {
        path: 'dashboard', component: DashboardComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    ListaFiisComponent,
    DashboardComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatDatepickerModule,
  ],
  providers: [MatDatepickerModule,
  {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: []
})
export class BodyModule { }
