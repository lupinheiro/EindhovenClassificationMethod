//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './flowchart.component';
import { FlowRoutingModule } from './flowchart-routing.module';
import { DiagramComponent } from './diagram/diagram.component';


@NgModule({
  imports: [
    //BrowserModule,
    HttpClientModule,
    FlowRoutingModule
  ],
  declarations: [
    AppComponent,
    DiagramComponent
  ],
  
  bootstrap: [AppComponent]
})
export class FlowchartModel { }
