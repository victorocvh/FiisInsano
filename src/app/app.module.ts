import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon'
import { HeaderTemplateComponent } from './header-template/header-template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyTemplateComponent } from './body-template/body-template.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTemplateComponent,
    BodyTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
