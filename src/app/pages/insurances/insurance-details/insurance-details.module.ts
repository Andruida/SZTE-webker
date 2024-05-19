import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InsuranceDetailsRoutingModule } from './insurance-details-routing.module';
import { InsuranceDetailsComponent } from './insurance-details.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InsuranceDetailsComponent
  ],
  imports: [
    CommonModule,
    InsuranceDetailsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class InsuranceDetailsModule { }

