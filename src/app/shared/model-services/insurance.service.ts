import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, collection, doc, setDoc, getDoc, deleteDoc, addDoc, getDocs } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { CarService } from './car.service';
import { Insurance } from '../models/Insurance';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  static collectionName = 'insurances';

  constructor(private fs: Firestore) {}

  getCollection(userId: string, carId: string) {
    return collection(this.fs, 
      UserService.collectionName, userId, 
      CarService.collectionName, carId,
      InsuranceService.collectionName);
  }

  create(userId: string, carId: string, insurance: Insurance) {
    return this.update(userId, carId, insurance);
  }

  fetch(userId: string, carId: string, insuranceId: string) {
    const ref: DocumentReference = doc(this.getCollection(userId, carId), insuranceId);
    return getDoc(ref);
  }

  fetchAll(userId: string, carId: string) {
    return getDocs(this.getCollection(userId, carId));
  }

  update(userId: string, carId: string, insurance: Insurance) {
    const ref: DocumentReference = doc(this.getCollection(userId, carId), insurance.id);
    return setDoc(ref, insurance);
  }

  delete(userId: string, carId: string, insuranceId: string) {
    const ref: DocumentReference = doc(this.getCollection(userId, carId), insuranceId);
    return deleteDoc(ref);
  }
}
