import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EgOnchangesComponent } from './eg-onchanges/eg-onchanges.component';
import { ProductListComponent } from './eg-template-outlet/product-list/product-list.component';
import { EgTemplateOutletComponent } from './eg-template-outlet/eg-template-outlet.component';
import { FormsModule } from '@angular/forms';
import { OnChangesChildComponent } from './eg-onchanges/on-changes-child/on-changes-child.component';
import { LivetrackingComponent } from './livetracking/livetracking.component';
import { TruckMapComponent } from './livetracking/truck-map/truck-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EgOnchangesComponent,
    ProductListComponent,
    EgTemplateOutletComponent,
    OnChangesChildComponent,
    LivetrackingComponent,
    TruckMapComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
