import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() loggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }
  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
    this.close.emit(true);
  }

}
