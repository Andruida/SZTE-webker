import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CarService } from '../../../shared/model-services/car.service';
import { AuthService } from '../../../shared/auth.service';
import { Car } from '../../../shared/models/Car';


@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.scss'
})
export class CarTableComponent implements OnInit {
  columns = [{ prop: 'plate', name:"Rendszám" }, { prop:"color", name: 'Szín' },];
  ColumnMode = ColumnMode;
  rows: Car[] = [];

  constructor(private cs: CarService, private auth: AuthService) {}
  ngOnInit(): void {
      this.auth.isLoggedIn().then((loggedIn) => {
        if (loggedIn) {
          const user = this.auth.getUser()!
          this.cs.fetchAll(user.uid).then((cars) => {
            console.log(cars);
            this.rows = cars;
          });
        }
      });
  }

  

}
