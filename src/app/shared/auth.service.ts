import { Injectable, inject } from '@angular/core';

import { Auth, browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { 
  }

  ready() {
    return this.auth.authStateReady();
  }

  getObservableUser() {
    return user(this.auth);
  }

  async isLoggedIn() {
    await this.auth.authStateReady();
    console.log(this.auth.currentUser);
    return this.auth.currentUser !== null;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return this.auth.signOut();
  }
}
