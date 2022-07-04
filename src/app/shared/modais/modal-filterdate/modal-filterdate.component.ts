import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-filterdate',
  templateUrl: './modal-filterdate.component.html',
  styleUrls: ['./modal-filterdate.component.css']
})
export class ModalFilterdateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getMonth(monthNumber: number) {
    return moment(`${moment().format('yyyy')}-${monthNumber}`).locale('pt-br').format('MMMM')
  }

  actualMonth(monthNumber: number) {
    let value = moment().format('M')
    console.log('mn: ', monthNumber, 'val: ', value);
  }

}
