import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy{
  title = 'biztos-kocsi';
  loggedIn: boolean = false;
  subscription?: Subscription;

  constructor(private auth: AuthService) {
    this.subscription = this.auth.getObservableUser().subscribe((user) => {
      this.loggedIn = user !== null;
    });
  }

  close(sidenav: any) {
    sidenav.close();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    
  }

}
