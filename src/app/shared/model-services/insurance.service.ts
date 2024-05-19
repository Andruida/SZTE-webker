import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, collection, doc, setDoc, getDoc, deleteDoc, addDoc, getDocs, QuerySnapshot, query, orderBy } from '@angular/fire/firestore';
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

  async fetch(userId: string, carId: string, insuranceId: string) {
    const ref: DocumentReference = doc(this.getCollection(userId, carId), insuranceId);
    const data = await getDoc(ref);
    return {...data.data()} as Insurance;
  }

  async fetchAll(userId: string, carId: string) {
    const data: QuerySnapshot = await getDocs(
      query(this.getCollection(userId, carId), orderBy('expiration'))
    );
    return data.docs.map((doc) => {
      return {...doc.data()} as Insurance;
    });
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
