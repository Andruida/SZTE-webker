import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthService } from '../../../shared/auth.service';
import { Car } from '../../../shared/models/Car';
import { Router } from '@angular/router';
import { Insurance } from '../../../shared/models/Insurance';
import { InsuranceService } from '../../../shared/model-services/insurance.service';

@Component({
  selector: 'app-insurance-table',
  templateUrl: './insurance-table.component.html',
  styleUrl: './insurance-table.component.scss'
})

export class InsuranceTableComponent implements OnInit {
  columns = [
    { prop: 'expiration', name: 'Lejárat' },
    { prop: 'type', name: 'Típus' },
  ];
  ColumnMode = ColumnMode;
  rows: Insurance[] = [];

  userId?: string;
  carId?: string;

  constructor(private is: InsuranceService, private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    const path = this.router.url.split('/');
    this.carId = path[2];
    this.auth.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        const user = this.auth.getUser()!;
        this.userId = user.uid;
        this.is.fetchAll(user.uid, this.carId!).then((insurances) => {
          console.log(insurances);
          this.rows = insurances;
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
    const row: Insurance = $event.row;
    this.router.navigateByUrl('/cars/'+this.carId+'/insurances/'+row.id);
    console.log(row);
  }
}
