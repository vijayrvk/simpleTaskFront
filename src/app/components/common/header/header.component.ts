import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtilService} from '../../../services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name = '';
  access;
  modules = [];

  constructor(public router: Router, public util: UtilService,) {
    try {
      this.name = this.util.getJson('name')['name'];
      this.access = this.util.getJson('access');
      this.modules = this.util.getJson('modules');
    } catch (e) {
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }

  }

  checkModuleHasPermission(module) {
    if (this.modules.indexOf(module) > -1) {
      return true;
    }
    return false;
  }

  needToCheckAccess(url) {
    return this.checkForAccess(url, this.access);
  }

  checkForAccess(url, access) {

    return true
    if (!this.util.checkNull(access)) {
      access = access['access'];
      if (url == '/user-create') {
        if (access.user.create) {
          return true;
        }
      }
      if (url == '/user-view') {
        if (access.user.view) {
          return true;
        }
      }
      if (url == '/user-edit') {
        if (access.user.view) {
          return true;
        }
      }if (url == '/create-project') {
        if (access.project.create) {
          return true;
        }
      }
      if (url == '/view-project') {
        if (access.project.view) {
          return true;
        }
      }
      if (url == '/edit-project') {
        if (access.project.view) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  ngOnInit() {
  }

  signout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
