import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, collection, doc, setDoc, getDoc, deleteDoc, getDocs } from '@angular/fire/firestore';
import { Car } from '../models/Car';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  static collectionName = 'cars';

  constructor(private fs: Firestore) {}

  getCollection(userId: string) {
    return collection(this.fs, UserService.collectionName, userId, CarService.collectionName);
  }

  create(userId: string, car: Car) {
    return this.update(userId, car);
  }

  fetch(userId: string, carId: string) {
    const ref: DocumentReference = doc(this.getCollection(userId), carId);
    return getDoc(ref);
  }

  fetchAll(userId: string) {
    return getDocs(this.getCollection(userId));
  }

  update(userId: string, car: Car) {
    const ref: DocumentReference = doc(this.getCollection(userId), car.id);
    return setDoc(ref, car);
  }

  delete(userId: string, carId: string) {
    const ref: DocumentReference = doc(this.getCollection(userId), carId);
    return deleteDoc(ref);
  }
}
