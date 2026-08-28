import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EgTemplateOutletComponent } from './eg-template-outlet/eg-template-outlet.component';
import { EgOnchangesComponent } from './eg-onchanges/eg-onchanges.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EgTemplateOutletComponent,
    EgOnchangesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
