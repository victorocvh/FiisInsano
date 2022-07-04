import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ModalFilterdateComponent } from '../modais/modal-filterdate/modal-filterdate.component';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css']
})
export class FilterDateComponent implements OnInit {

  openDate = false;

  // Height Input
  @Input() height = 15;

  // Data Selected
  public dateSelected = moment();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    let inputdate = document.getElementById('inputdate');
    let btndate = document.getElementById('btn-date');

    if (inputdate != null) {
      inputdate.style.height = this.height.toString()+'px';
      inputdate.setAttribute('value', this.dateSelected.format('DD/MM/yyyy'))
    }

  }

  openModal() {
    this.dialog.open(ModalFilterdateComponent, {
      height: '80vh',
      width: '400px',
      panelClass: 'modal-style'
    });
  }

}
