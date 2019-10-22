import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(public util: UtilService) {
  }

  isAuthenticated() {
    return sessionStorage.getItem('userId') ? true : false;
  }

  getUserId() {
    return this.util.getText('userId');
  }

  getToken() {

    return this.util.getText('token');
  }


  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
