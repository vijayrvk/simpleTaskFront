import {Injectable} from '@angular/core';
import {UtilService} from './util.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public util: UtilService, public router: Router) {
  }

  getUserId() {
    try {
      return this.util.getText('userId');
    } catch (e) {
      console.log('data tentat')
      this.router.navigateByUrl('/login');
    }

  }

  getToken() {
    try {
      return this.util.getText('token');
    } catch (e) {
      console.log('data tentat')
      this.router.navigateByUrl('/login');
    }
  }

  clearAllData() {
    sessionStorage.clear();
    localStorage.clear();
  }
}
