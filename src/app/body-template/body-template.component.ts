import { Component, OnInit } from '@angular/core';
import * as fs from 'fs';
@Component({
  selector: 'app-body-template',
  templateUrl: './body-template.component.html',
  styleUrls: ['./body-template.component.css']
})
export class BodyTemplateComponent implements OnInit {

  public array = [1,2,3,4,5,6,7,8,9,10,11,12,13];

  public isMenuAberto : boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log('ox');
  }


  public changeMenuStatus() {
    this.isMenuAberto = !this.isMenuAberto;
  }

}
