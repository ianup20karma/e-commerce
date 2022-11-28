import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loggedUserData: Subject<any> = new BehaviorSubject(null);
  constructor() {
    this.loggedUserData.next(JSON.parse(localStorage.getItem('userData')!));
  }

  isLoggedIn() {
    return localStorage.getItem('userData') ? true : false;
  }

  setLoggedUserData(token: any) {
    localStorage.setItem('userData', JSON.stringify(token));
  }

  deleteLoggedUserData() {
    localStorage.removeItem('userData');
  }

  isFormSame = (obj1: any, obj2: any) => {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
      return Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]);
    }
    return false;
  }
}
