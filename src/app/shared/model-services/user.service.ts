import { Injectable } from '@angular/core';

import { DocumentReference, Firestore, collection, doc, setDoc, getDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static collectionName = 'users';

  constructor(private fs: Firestore) {}

  create(user: User) {
    return this.update(user);
    //collection(this.fs, UserService.collectionName, user.id, CarService.collectionName);
  }

  fetch(id: string) {
    const ref: DocumentReference = doc(collection(this.fs, UserService.collectionName), id);
    return getDoc(ref);
  }

  update(user: User) {
    const ref: DocumentReference = doc(collection(this.fs, UserService.collectionName), user.id);
    return setDoc(ref, user);
  }

  delete(id: string) {
    const ref: DocumentReference = doc(collection(this.fs, UserService.collectionName), id);
    return deleteDoc(ref);
  }


}
