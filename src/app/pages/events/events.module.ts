import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventTableComponent } from './event-table/event-table.component';

import { MatCardModule } from '@angular/material/card';
import { EventDetailsModule } from './event-details/event-details.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButton } from '@angular/material/button';



@NgModule({
  declarations: [
    EventsComponent,
    EventTableComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    EventDetailsModule,
    MatCardModule,
    NgxDatatableModule,

    MatButton
    
  ]
})
export class EventsModule { }
