import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EgOnchangesComponent } from './eg-onchanges/eg-onchanges.component';
import { ProductListComponent } from './eg-template-outlet/product-list/product-list.component';
import { EgTemplateOutletComponent } from './eg-template-outlet/eg-template-outlet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EgOnchangesComponent,
    ProductListComponent,
    EgTemplateOutletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
