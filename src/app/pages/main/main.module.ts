import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatCardModule } from '@angular/material/card';
import { CarTableComponent } from './car-table/car-table.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    MainComponent,
    CarTableComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    NgxDatatableModule
  ]
})
export class MainModule { }
