import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';
import { Car } from '../../../shared/models/Car';
import { MatSnackBar } from '@angular/material/snack-bar';

import { v4 as uuidv4 } from 'uuid';
import { EventService } from '../../../shared/model-services/event.service';
import { InsuranceEvent } from '../../../shared/models/InsuranceEvent';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    status: new FormControl('Benyújtott', [Validators.required]),
    details: new FormControl('', [Validators.required]),
  });

  userId?: string;
  carId?: string;
  insuranceId?: string;
  eventId?: string;

  constructor(
    private es: EventService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const path = this.router.url.split('/');
    this.carId = path[2];
    this.insuranceId = path[4];
    this.eventId = path[6];
    console.log(path);
    
    this.auth.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        const user = this.auth.getUser()!;
        this.userId = user.uid;
        if (this.eventId === undefined || this.eventId === 'new') {
          return;
        }
        this.es.fetch(user.uid, this.carId!, this.insuranceId!, this.eventId).then((event: InsuranceEvent) => {
          this.eventForm.setValue({
            date: event.date,
            status: event.status,
            details: event.details,
          });
        });
      }
    });
  }

  save() {
    if (this.userId === undefined) {
      return;
    }
    var p: Promise<void>;
    if (this.router.url.split('/')[6] === 'new') {
      p = this.es.create(
        this.userId,
        this.carId!,
        this.insuranceId!,
        Object.assign(this.eventForm.value, {
          id: uuidv4(),
        })
      );
    } else {
      p = this.es.update(
        this.userId,
        this.carId!,
        this.insuranceId!,
        Object.assign(this.eventForm.value, {
          id: this.router.url.split('/')[6],
        })
      );
    }

    p.then(() => {
      this.router.navigateByUrl('/cars/'+this.carId+'/insurances/'+this.insuranceId+'/events');
      this.snackBar.open('Sikeres bejelentés!', 'OK', { duration: 10000 });
    });
  }

  remove() {
    if (this.userId === undefined) {
      return;
    }
    if (this.carId === undefined) {
      return;
    }
    if (this.insuranceId === undefined) {
      return;
    }
    if (this.eventId === undefined) {
      return;
    }
    this.es.delete(this.userId, this.carId, this.insuranceId, this.eventId).then(() => {
      this.router.navigateByUrl('/cars/'+this.carId+'/insurances/'+this.insuranceId+'/events');
      this.snackBar.open('Sikeres törlés', 'OK', { duration: 10000 });
    });
  }
}
