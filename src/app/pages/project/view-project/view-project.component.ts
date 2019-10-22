import {Component, OnInit} from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../../services/data-service.service';
import {ModalService} from '../../../services/modal.service';
import {UtilService} from '../../../services/util.service';
import {LoaderService} from '../../../services/loader.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  projects = []
  pagination: any = {
    limit: 10,
    offset: 1,
    total: 0,
    maxsize: 1
};
  constructor(public httpService: HttpServiceService,
    public dataService: DataServiceService,
    public modal: ModalService,
    public loader: LoaderService,
    public util: UtilService,
    public router: Router) { }

  ngOnInit() {
    this.httpService.postApi(this.pagination, 'project/getProjectCondition').subscribe(res => {
      this.projects = res['data'];
      this.pagination.total = res['count'];
    });
  }

  editProject(project: any) {
    sessionStorage.setItem('project', JSON.stringify(project));
    this.router.navigateByUrl('/edit-project');
  }

  pageChange(pageNo){
    this.pagination.offset = pageNo;
    this.httpService.postApi(this.pagination, 'project/getProjectCondition').subscribe(res => {
      this.projects = res['data'];
      this.pagination.total = res['count'];
    });
  }

}
