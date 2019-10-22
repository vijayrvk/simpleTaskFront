import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpServiceService} from '../../../services/http-service.service';
import {ModalService} from '../../../services/modal.service';
import {LoaderService} from '../../../services/loader.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../../services/data-service.service';
import {UtilService} from '../../../services/util.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userCreateForm: FormGroup;
  validator = Validators.email;

  roles = [];

  constructor(private formBuilder: FormBuilder,
              public modal: ModalService,
              public router: Router,
              public util: UtilService,
              public loader: LoaderService,
              public dataService: DataServiceService,
              public httpService: HttpServiceService) {
    this.loader.showLoader();
  }

  ngOnInit() {
    this.userCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      loginId: ['', Validators.email],
      password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      roleId: ['', Validators.required],
      modules: ['', Validators.required],
      isActive: ['', Validators.required]

    });
    this.getRoles().then(res => {
        this.loader.hideLoader();
    }, err => {
      this.loader.hideLoader();
    });
  }

  
  getRoles = () => {
    return new Promise((resolve) => {
      this.httpService.postApi({
        isActive: true
      }, 'roles/getRoleCondition').subscribe((res) => {
        if (res['success']) {
          this.roles = res['data'];
        }
        resolve(1);
      }, err => {
        resolve(0);
      });
    });
  };


  
  userCreate(data) {
    this.loader.showLoader();
    data.userId = this.dataService.getUserId();
    this.httpService.postApi(data, 'user/createUser').subscribe(res => {
      this.loader.hideLoader();
      if (res.success) {
        this.router.navigateByUrl('/view-user');
      } else {
        this.modal.showModal({'success': false, 'message': 'Something went wrong. Please try again'});
      }
    }, err => {
      this.loader.hideLoader();
      this.modal.showModal({'success': false, 'message': 'Something went wrong. Please try again'})
    });

  }
}
