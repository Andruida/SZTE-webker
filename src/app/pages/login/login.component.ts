import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCredential } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
  });

  constructor(private auth : AuthService, private snackbar: MatSnackBar, private router: Router) {
    this.auth.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigateByUrl("/");
      }
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    try {
      const user: UserCredential = await this.auth.login(
        this.loginForm.get("email")?.value, this.loginForm.get("password")?.value
      )
      this.snackbar.open("Sikeres bejelentkezés!", "OK", {duration: 10000});
      this.router.navigateByUrl("/");      
    } catch (error) {
      this.snackbar.open("Hibás e-mail cím vagy jelszó!", "OK", {duration: 10000});
    }
  }
}
