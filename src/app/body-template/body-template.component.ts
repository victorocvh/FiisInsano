import { Component, OnInit } from '@angular/core';
import * as fs from 'fs';
@Component({
  selector: 'app-body-template',
  templateUrl: './body-template.component.html',
  styleUrls: ['./body-template.component.css']
})
export class BodyTemplateComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    console.log('ox');
  }

}
