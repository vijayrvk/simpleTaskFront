import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataServiceService} from '../../../services/data-service.service';
import {HttpServiceService} from '../../../services/http-service.service';
import {Router} from '@angular/router';
import {ModalService} from '../../../services/modal.service';
import {UtilService} from '../../../services/util.service';
import {LoaderService} from '../../../services/loader.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  createRoleForm: FormGroup;
  access = {
    user: {create: false, view: false, edit: false},
    project: {create: false, view: false, edit: false}
  };

  constructor(private formBuilder: FormBuilder,
              public dataService: DataServiceService,
              public util: UtilService,
              public router:Router,
              public loader: LoaderService,
              public modal: ModalService,
              public httpService: HttpServiceService, public route: Router) {
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

  ngOnInit() {
    this.createRoleForm = this.formBuilder.group({
      name: ['', Validators.required],
      isActive: ['', Validators.required],

    });
    let data = JSON.parse(sessionStorage.getItem('role'));
    console.log(data)
    this.createRoleForm.patchValue(data);
    this.access = data['access'];
  }

  createRole(data) {
    let json = data;
    json.updatedBy = this.dataService.getUserId();
    json.access = this.access;
    json.id = JSON.parse(sessionStorage.getItem('role'))['_id'];
    this.httpService.postApi(json, 'roles/updateRolesDetails').subscribe(res => {
      if (res.success) {
        this.router.navigateByUrl('/view-role');
      } else {
        this.modal.showModal({'success': false, 'message': res.message});
      }
    }, err => {
      this.modal.showModal({'success': false, 'message': 'Something went wrong. Please try again'});
    });
  }

}
