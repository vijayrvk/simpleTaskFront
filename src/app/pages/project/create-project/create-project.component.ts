import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpServiceService} from '../../../services/http-service.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../../services/data-service.service';
import {UtilService} from '../../../services/util.service';
import {LoaderService} from '../../../services/loader.service';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectCreateForm: FormGroup;
  error = [];
  validate = false;
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
  }
  createProject(data) {
    this.loader.showLoader();
      this.loader.hideLoader();
      data.createdBy = this.dataService.getUserId();
      this.httpService.postApi(data, 'project/createProject').subscribe((res) => {
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
