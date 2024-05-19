import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, collection, doc, setDoc, getDoc, deleteDoc, getDocs } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { CarService } from './car.service';
import { InsuranceService } from './insurance.service';
import { InsuranceEvent } from '../models/InsuranceEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  static collectionName = 'events';

  constructor(private fs: Firestore) {}

  getCollection(userId: string, carId: string, insuranceId: string) {
    return collection(this.fs, 
      UserService.collectionName, userId, 
      CarService.collectionName, carId,
      InsuranceService.collectionName, insuranceId,
      EventService.collectionName);
  }

  create(userId: string, carId: string, insuranceId: string, event: InsuranceEvent) {
    return this.update(userId, carId, insuranceId, event);
  }

  fetch(userId: string, carId: string, insuranceId: string, eventId: string) {
    const ref: DocumentReference = doc(this.getCollection(userId, carId, insuranceId), eventId);
    return getDoc(ref);
  }

  fetchAll(userId: string, carId: string, insuranceId: string) {
    return getDocs(this.getCollection(userId, carId, insuranceId));
  }

  update(userId: string, carId: string, insuranceId: string, event: InsuranceEvent) {
    const ref: DocumentReference = doc(this.getCollection(userId, carId, insuranceId), event.id);
    return setDoc(ref, event);
  }

  delete(userId: string, carId: string, insuranceId: string, eventId: string) {
    const ref: DocumentReference = doc(this.getCollection(userId, carId, insuranceId), eventId);
    return deleteDoc(ref);
  }
}