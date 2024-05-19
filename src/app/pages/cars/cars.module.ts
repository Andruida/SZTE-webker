import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { CarTableComponent } from './car-table/car-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCardModule } from '@angular/material/card';
import { CarDetailsModule } from './car-details/car-details.module';
import { MatButton } from '@angular/material/button';



@NgModule({
  declarations: [
    CarsComponent,
    CarTableComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    NgxDatatableModule,
    MatCardModule,
    CarDetailsModule,
    MatButton
  ]
})
export class CarsModule { }
