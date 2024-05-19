import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';
import { EventService } from '../../../shared/model-services/event.service';
import { InsuranceEvent } from '../../../shared/models/InsuranceEvent';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrl: './event-table.component.scss'
})

export class EventTableComponent implements OnInit {
  columns = [
    { prop: 'date', name: 'Dátum' },
    { prop: 'status', name: 'Állapot' },
    { prop: 'details', name: 'Részletek' },
  ];
  ColumnMode = ColumnMode;
  rows: InsuranceEvent[] = [];

  userId?: string;
  carId?: string;
  insuranceId?: string;

  constructor(private es: EventService, private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    const path = this.router.url.split('/');
    this.carId = path[2];
    this.insuranceId = path[4];
    this.auth.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        const user = this.auth.getUser()!;
        this.userId = user.uid;
        this.es.fetchAll(user.uid, this.carId!, this.insuranceId!).then((events) => {
          console.log(events);
          this.rows = events;
        });
      }
    });
  }

  onActivate($event: any) {
    if ($event.type !== 'click') {
      return;
    }
    if ($event.row === undefined) {
      return;
    }
    const row: InsuranceEvent = $event.row;
    this.router.navigateByUrl('/cars/'+this.carId+'/insurances/'+this.insuranceId+'/events/'+row.id);
    console.log(row);
  }
}
