import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EventDetailsRoutingModule } from './event-details-routing.module';
import { EventDetailsComponent } from './event-details.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    EventDetailsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class EventDetailsModule { }

