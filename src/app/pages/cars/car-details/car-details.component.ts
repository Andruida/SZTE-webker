import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../shared/model-services/car.service';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';
import { Car } from '../../../shared/models/Car';
import { MatSnackBar } from '@angular/material/snack-bar';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent implements OnInit {
  carForm: FormGroup = new FormGroup({
    plate: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });

  userId?: string;
  carId?: string;

  constructor(
    private cs: CarService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const path = this.router.url.split('/')[2];
    this.carId = path;
    console.log(path);
    
    this.auth.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        const user = this.auth.getUser()!;
        this.userId = user.uid;
        if (path === undefined || path === 'new') {
          return;
        }
        this.cs.fetch(user.uid, path!).then((car: Car) => {
          this.carForm.setValue({
            plate: car.plate,
            color: car.color,
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
    if (this.router.url.split('/')[2] === 'new') {
      p = this.cs.create(
        this.userId,
        Object.assign(this.carForm.value, {
          id: uuidv4(),
        })
      );
    } else {
      p = this.cs.update(
        this.userId,
        Object.assign(this.carForm.value, {
          id: this.router.url.split('/')[2],
        })
      );
    }

    p.then(() => {
      this.router.navigateByUrl('/cars');
      this.snackBar.open('Sikeres mentés', 'OK', { duration: 10000 });
    });
  }

  remove() {
    if (this.userId === undefined) {
      return;
    }
    if (this.carId === undefined) {
      return;
    }
    this.cs.delete(this.userId, this.carId).then(() => {
      this.router.navigateByUrl('/cars');
      this.snackBar.open('Sikeres törlés', 'OK', { duration: 10000 });
    });
  }
}
