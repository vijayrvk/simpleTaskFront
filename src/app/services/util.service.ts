import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import SimpleCrypto from 'simple-crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  simpleCrypto = new SimpleCrypto('vijay');

  constructor(private _location: Location, public router: Router) {
  }

  convertTime = (time) => {
    return new Date(time).toJSON().slice(0, 19).replace('T', ' ');
  };

  storeText = (key, value) => {

    sessionStorage.setItem(key, this.encryptData(value));
  };

  storeJson = (key, value) => {
    sessionStorage.setItem(key, this.encryptData(JSON.stringify(value)));
  };

  getText = (key) => {
    if (!this.checkUserDataExist()) {
      this.router.navigateByUrl('/login');
    }
    return this.decryptData(sessionStorage.getItem(key));
  };

  getJson = (key) => {
    if (!this.checkUserDataExist()) {
      this.router.navigateByUrl('/login');
    }
    return JSON.parse(this.decryptData(sessionStorage.getItem(key)) + '');
  };

  encryptData = (data) => {
    try {
      return this.simpleCrypto.encrypt(data);
    } catch (e) {
      this.router.navigateByUrl('/login');
    }

  };

  decryptData = (data) => {
    try {
      return this.simpleCrypto.decrypt(data);
    } catch (e) {
      this.router.navigateByUrl('/login');
    }
  };

  backClicked = () => {
    this._location.back();
  };

  isObject(item) {
    return (typeof item === 'object' && !Array.isArray(item) && item !== null);
  }

  checkNull(data) {
    if (!data || typeof data == undefined) {
      return true;
    }
    return false;
  }

  checkForAccess(url) {
    let access = this.getJson('access');
    if (!this.checkNull(access)) {
      access = access['access'];
      if (url == '/create-user') {
        if (access.user.create) {
          return true;
        }
      }
      if (url == '/view-user') {
        if (access.user.view) {
          return true;
        }
      }
      if (url == '/edit-user') {
        if (access.user.view) {
          return true;
        }
      }

      if(url=='/create-role'){
        if (access.user.create) {
          return true;
        }
      }

      if(url=='/edit-role'){
        if (access.user.edit) {
          return true;
        }
      }

      if(url=='/view-role'){
        if (access.user.view) {
          return true;
        }
      }

      if(url=='/create-project'){
        if (access.project.create) {
          return true;
        }
      }

      if(url=='/edit-project'){
        console.log('asdfasdfadsfasd')
        if (access.project.edit) {
          return true;
        }
      }

      if(url=='/view-project'){
        if (access.project.view) {
          return true;
        }
      }

      return false;
    } else {
      return false;
    }
  }

  checkUserDataExist() {
    if (sessionStorage.getItem('userId') === null ||
      sessionStorage.getItem('token') === null ||
      sessionStorage.getItem('access') === null ||
      sessionStorage.getItem('name') === null
    ) {
      return false;
    }

    return true;
  }

  checkModuleHasPermission(module) {
    let data = this.getJson('modules');
    console.log(data)
    if (data.indexOf(module) > -1) {
      return true;
    }
    return false;
  }

  checkRouteAccess(url: string, route) {
    return this.checkForAccess(url);
  }

  enableFromValidation(form) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({onlySelf: true});
    })
  }
}
