import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpServiceService} from '../../services/http-service.service';
import {DataServiceService} from '../../services/data-service.service';
import {ModalService} from '../../services/modal.service';
import {UtilService} from '../../services/util.service';
import {Router} from '@angular/router';
import {LoaderService} from '../../services/loader.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dataService: DataServiceService,
              public httpService: HttpServiceService,
              public util: UtilService,
              public loader: LoaderService,
              public modal: ModalService, public route: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  
  login(data) {
    this.loader.showLoader();
    console.log('login form');
    console.log(data);
    this.httpService.postApi(data, 'auth/login').subscribe((res) => {
      console.log({res});
      this.loader.hideLoader();
      if (res.success) {
        this.util.storeText('userId', res.data.userId);
        this.util.storeText('token', res.data.token);
        this.util.storeJson('access', res.data.role);
        this.util.storeJson('name', {'name': res.data.name});
        let arr = res.data.modules;
        this.util.storeJson('modules', arr);
        this.route.navigate(['/view-project']);
      } else {
        this.modal.showModal({
          'success': false,
          'message': res.message
        });
      }
    }, err => {
      this.loader.hideLoader();
      this.modal.showModal({
        'success': false,
        'message': 'Something went wrong. Please try again'
      });
    });
  }
}
