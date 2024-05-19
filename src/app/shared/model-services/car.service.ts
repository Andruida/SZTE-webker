import { Injectable } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  DocumentSnapshot,
  QuerySnapshot,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Car } from '../models/Car';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  static collectionName = 'cars';

  constructor(private fs: Firestore) {}

  getCollection(userId: string) {
    return collection(
      this.fs,
      UserService.collectionName,
      userId,
      CarService.collectionName
    );
  }

  create(userId: string, car: Car) {
    return this.update(userId, car);
  }

  async fetch(userId: string, carId: string) {
    const ref: DocumentReference = doc(this.getCollection(userId), carId);
    const data: DocumentSnapshot = await getDoc(ref);
    return { ...data.data() } as Car;
  }

  async fetchAll(userId: string) {
    const data: QuerySnapshot = await getDocs(
      query(this.getCollection(userId), orderBy('plate'))
    );
    return data.docs.map((doc) => {
      return { ...doc.data() } as Car;
    });
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
