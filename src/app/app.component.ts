import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'biztos-kocsi';
  loggedIn: boolean = false;

  constructor(private auth: AuthService) {
    this.auth.getObservableUser().subscribe((user) => {
      this.loggedIn = user !== null;
    });
  }

  close(sidenav: any) {
    sidenav.close();
  }

}
