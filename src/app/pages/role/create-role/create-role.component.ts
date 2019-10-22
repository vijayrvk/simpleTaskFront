import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpServiceService} from '../../../services/http-service.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../../services/data-service.service';
import {UtilService} from '../../../services/util.service';
import {LoaderService} from '../../../services/loader.service';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  createRoleForm: FormGroup;
  access = {
    user: {create: false, view: false, edit: false},
    project: {create: false, view: false, edit: false}
  };

  constructor(private formBuilder: FormBuilder,
              public dataService: DataServiceService,
              public util: UtilService,
              public loader: LoaderService,
              public modal: ModalService,
              public httpService: HttpServiceService, public route: Router) {
  }

  ngOnInit() {
    this.createRoleForm = this.formBuilder.group({
      name: ['', Validators.required],
      isActive: ['', Validators.required],

    });
  }

  toggleSelect(module){

    let user = ['create','edit','view']
    let project = ['create','edit','view']
    if(module=='user'){
      let value=this.access.user;
      user.forEach(item=>{
        let obj=this.access[item];
        Object.keys(obj).forEach(key=>{
          this.access[item][key]=value;
        })
      })
    }

    if(module=='project'){
      let value=this.access.project;
      project.forEach(item=>{
        let obj=this.access[item];
        Object.keys(obj).forEach(key=>{
          this.access[item][key]=value;
        })
      })
    }

  }

  createRole(data) {
    this.loader.showLoader();
    console.log('create role function');
    console.log(data);
    console.log({access: this.access});
    data.access = this.access;
    data.createdBy = this.dataService.getUserId();
    this.httpService.postApi(data, 'roles/createRoles').subscribe((res) => {
      this.loader.hideLoader();
      console.log(res);
      if (res.success) {
        console.log('role created');
        this.route.navigate(['/view-role']);
      } else {
        this.modal.showModal({'success': false, 'message': 'Something went wrong. Please try again'});
      }
    }, err => {
      this.loader.hideLoader();
      this.modal.showModal({'success': false, 'message': 'Something went wrong. Please try again'});
    });
  }
}
