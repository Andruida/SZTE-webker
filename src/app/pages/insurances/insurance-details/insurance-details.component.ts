import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { v4 as uuidv4 } from 'uuid';
import { InsuranceService } from '../../../shared/model-services/insurance.service';
import { Insurance } from '../../../shared/models/Insurance';

@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrl: './insurance-details.component.scss'
})
export class InsuranceDetailsComponent implements OnInit {
  insuranceForm: FormGroup = new FormGroup({
    expiration: new FormControl(new Date(), [Validators.required]),
    type: new FormControl('Általános', [Validators.required]),
  });

  userId?: string;
  carId?: string;
  insuranceId?: string;

  constructor(
    private is: InsuranceService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const path = this.router.url.split('/');
    this.carId = path[2];
    this.insuranceId = path[4];
    console.log(path);
    
    this.auth.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        const user = this.auth.getUser()!;
        this.userId = user.uid;
        if (this.insuranceId === undefined || this.insuranceId === 'new') {
          return;
        }
        this.is.fetch(user.uid, this.carId!, this.insuranceId!).then((insurance: Insurance) => {
          this.insuranceForm.setValue({
            expiration: insurance.expiration,
            type: insurance.type,
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
    if (this.router.url.split('/')[4] === 'new') {
      p = this.is.create(
        this.userId,
        this.carId!,
        Object.assign(this.insuranceForm.value, {
          id: uuidv4(),
        })
      );
    } else {
      p = this.is.update(
        this.userId,
        this.carId!,
        Object.assign(this.insuranceForm.value, {
          id: this.router.url.split('/')[4],
        })
      );
    }

    p.then(() => {
      this.router.navigateByUrl('/cars/'+this.carId+'/insurances');
      this.snackBar.open('Sikeres biztosítás kötés!', 'OK', { duration: 10000 });
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
    this.is.delete(this.userId, this.carId, this.insuranceId).then(() => {
      this.router.navigateByUrl('/cars/'+this.carId+'/insurances');
      this.snackBar.open('Sikeres bontás!', 'OK', { duration: 10000 });
    });
  }
}
