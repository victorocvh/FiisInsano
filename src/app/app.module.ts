import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon'
import { HeaderTemplateComponent } from './header-template/header-template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyTemplateComponent } from './body-template/body-template.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginTemplateComponent } from './login-template/login-template.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderTemplateComponent,
    BodyTemplateComponent,
    MenuComponent,
    LoginTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
