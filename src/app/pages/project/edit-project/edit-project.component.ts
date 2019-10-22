import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpServiceService} from '../../../services/http-service.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../../services/data-service.service';
import {UtilService} from '../../../services/util.service';
import {LoaderService} from '../../../services/loader.service';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  projectCreateForm: FormGroup;
  response;
  constructor(private formBuilder: FormBuilder,
    public dataService: DataServiceService,
    public util: UtilService,
    public loader: LoaderService,
    public modal: ModalService,
    public httpService: HttpServiceService, public route: Router) { }

  ngOnInit() {
    this.projectCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate:['', Validators.required],
      endDate:['', Validators.required],
      billable:['', Validators.required],
      estimatedDays:['', Validators.required],
    });
    let data = JSON.parse(sessionStorage.getItem('project'));
    console.log(data)
    this.projectCreateForm.patchValue(data);
  }

  createProject(data) {
    console.log(data)
    this.loader.showLoader();
      this.loader.hideLoader();
      data.updatedBy = this.dataService.getUserId();
      data.id = JSON.parse(sessionStorage.getItem('project'))['_id'];
      this.httpService.postApi(data, 'project/updateProjectDetails').subscribe((res) => {
        this.loader.hideLoader();
        console.log(res);
        if (res.success) {
          this.route.navigate(['/view-project']);
        } else {
          this.modal.showModal({'success': false, 'message': res['message']});
        }
      }, err => {
        this.loader.hideLoader();
        this.modal.showModal({'success': false, 'message': 'Something went wrong. Please try again'});
      });
  }


}
