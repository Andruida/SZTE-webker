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
} from '@angular/fire/firestore';
import { UserService } from './user.service';
import { CarService } from './car.service';
import { InsuranceService } from './insurance.service';
import { InsuranceEvent } from '../models/InsuranceEvent';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  static collectionName = 'events';

  constructor(private fs: Firestore) {}

  getCollection(userId: string, carId: string, insuranceId: string) {
    return collection(
      this.fs,
      UserService.collectionName,
      userId,
      CarService.collectionName,
      carId,
      InsuranceService.collectionName,
      insuranceId,
      EventService.collectionName
    );
  }

  create(
    userId: string,
    carId: string,
    insuranceId: string,
    event: InsuranceEvent
  ) {
    return this.update(userId, carId, insuranceId, event);
  }

  async fetch(userId: string, carId: string, insuranceId: string, eventId: string) {
    const ref: DocumentReference = doc(
      this.getCollection(userId, carId, insuranceId),
      eventId
    );
    const data: DocumentSnapshot = await getDoc(ref);
    return {...data.data()} as InsuranceEvent;
  }

  async fetchAll(userId: string, carId: string, insuranceId: string) {
    const data = await getDocs(this.getCollection(userId, carId, insuranceId));
    return data.docs.map((doc) => {
      return {...doc.data()} as InsuranceEvent;
    });
  }

  update(
    userId: string,
    carId: string,
    insuranceId: string,
    event: InsuranceEvent
  ) {
    const ref: DocumentReference = doc(
      this.getCollection(userId, carId, insuranceId),
      event.id
    );
    return setDoc(ref, event);
  }

  delete(userId: string, carId: string, insuranceId: string, eventId: string) {
    const ref: DocumentReference = doc(
      this.getCollection(userId, carId, insuranceId),
      eventId
    );
    return deleteDoc(ref);
  }
}
