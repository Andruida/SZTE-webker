import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
    passwordConfirm: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
  });

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.value.password !== this.registerForm.value.passwordConfirm) {
      this.snackBar.open('A két jelszó nem egyezik meg.', 'OK', {
        duration: 10000,
      });
      return;
    }
    this.auth.register(this.registerForm.value.email, this.registerForm.value.password).then(() => {
      this.router.navigate(['/']);
    }).catch((error) => {
      this.snackBar.open(error.message, 'OK', {
        duration: 10000,
      });
    });
  }
  
}
