import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarDetailsRoutingModule } from './car-details-routing.module';
import { CarDetailsComponent } from './car-details.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';
import { ToUpperPipe } from '../../../shared/to-upper.pipe';


@NgModule({
  declarations: [
    CarDetailsComponent,
    ToUpperPipe
  ],
  imports: [
    CommonModule,
    CarDetailsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class CarDetailsModule { }
