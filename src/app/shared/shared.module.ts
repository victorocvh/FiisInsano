import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FilterDateComponent } from './filter-date/filter-date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatIconModule } from '@angular/material/icon';
import { ModalFilterdateComponent } from './modais/modal-filterdate/modal-filterdate.component';
import { ModalWarnComponent } from './modal-warn/modal-warn.component';
import { ModalNewativoComponent } from './modal-newativo/modal-newativo.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    FilterDateComponent,
    ModalFilterdateComponent,
    ModalWarnComponent,
    ModalNewativoComponent
  ],
  imports: [
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CurrencyMaskModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    NgSelectModule,
  ],
  exports: [
    FilterDateComponent,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CurrencyMaskModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ]
})
export class SharedModule { }
