import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-header-template',
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.css']
})
export class HeaderTemplateComponent implements OnInit {

  constructor(private auth: FirebaseAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
