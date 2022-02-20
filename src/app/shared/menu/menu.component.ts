import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menuList = ['Home', 'Cadastrar Ativos'];
  public menuListHref = ['i', '/cadastrar-ativos'];

  constructor() { }

  ngOnInit(): void {
  }

}
