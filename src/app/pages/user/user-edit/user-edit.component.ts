import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../services/modal.service';
import {Router} from '@angular/router';
import {LoaderService} from '../../../services/loader.service';
import {DataServiceService} from '../../../services/data-service.service';
import {HttpServiceService} from '../../../services/http-service.service';
import {UtilService} from '../../../services/util.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userCreateForm: FormGroup;
  validator = Validators.email;
  edited = false;
  roles = [];
  editData;

  constructor(private formBuilder: FormBuilder,
              public modal: ModalService,
              public router: Router,
              public util: UtilService,
              public loader: LoaderService,
              public dataService: DataServiceService,
              public httpService: HttpServiceService) {

    this.loader.showLoader();
  }

  changeEdit() {
    this.edited = !this.edited;
  }

  ngOnInit() {
    this.userCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      loginId: ['', this.validator],
      password: ['', Validators.required],
      roleId: ['', Validators.required],
      modules: ['', Validators.required],
      isActive: ['', Validators.required]

    });
    this.getRoles().then(res => {
        this.loader.hideLoader();
        this.editData = this.util.getJson('user');
        if (!this.util.isObject(this.editData)) {
          this.editData = JSON.parse(this.editData);
        }
        this.userCreateForm.patchValue(this.editData);
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
    data.id = this.editData['_id'];
    data.updatedBy = this.dataService.getUserId();
    data.edited = this.edited;
    this.httpService.postApi(data, 'user/updateUserDetails').subscribe(res => {
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
