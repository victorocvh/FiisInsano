import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fiis-insano';
  public array = [1,2,3,4,5,6,7,8,9,10,11,12,13];

  public isMenuAberto : boolean = false;


  public changeMenuStatus() {
    this.isMenuAberto = !this.isMenuAberto;
  }
}
