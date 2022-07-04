import { Component, OnInit } from '@angular/core';
import * as fs from 'fs';
import { FiisService } from '../services/fiis.service';
@Component({
  selector: 'app-body-template',
  templateUrl: './body-template.component.html',
  styleUrls: ['./body-template.component.css']
})
export class BodyTemplateComponent implements OnInit {

  public isMenuAberto : boolean = false;

  constructor(private fiisService: FiisService) { }

  ngOnInit(): void {
  }

  public changeMenuStatus() {
    this.isMenuAberto = !this.isMenuAberto;
  }

}
