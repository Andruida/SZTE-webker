import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesRoutingModule } from './insurances-routing.module';
import { InsurancesComponent } from './insurances.component';
import { InsuranceTableComponent } from './insurance-table/insurance-table.component';

import { MatCardModule } from '@angular/material/card';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InsuranceDetailsModule } from './insurance-details/insurance-details.module';
import { MatButton } from '@angular/material/button';


@NgModule({
  declarations: [
    InsurancesComponent,
    InsuranceTableComponent
  ],
  imports: [
    CommonModule,
    InsurancesRoutingModule,
    InsuranceDetailsModule,
    MatCardModule,
    NgxDatatableModule,
    MatButton
  ]
})
export class InsurancesModule { }
