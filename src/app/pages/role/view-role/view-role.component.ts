import {Component, OnInit} from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../../services/data-service.service';
import {ModalService} from '../../../services/modal.service';
import {UtilService} from '../../../services/util.service';
import {LoaderService} from '../../../services/loader.service';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {
  roles = [];

  constructor(public httpService: HttpServiceService,
              public dataService: DataServiceService,
              public modal: ModalService,
              public loader: LoaderService,
              public util: UtilService,
              public router: Router) {
    this.loader.showLoader();
  }

  ngOnInit() {
    this.httpService.getApi('roles/getAllRole?userId=' + this.dataService.getUserId()).subscribe((res) => {
      this.loader.hideLoader();
      if (res['success']) {
        this.roles = res['data'];
      }
    }, err => {
      this.loader.hideLoader();
    });

    this.dataService.currentMessage.subscribe(messageData => {
      console.log(messageData)
      let message=JSON.parse(messageData);
      if(message['page']=='device' && message['process'])
      {
        this.loader.showLoader()
        this.httpService.putApi({}, 'roles/updateRolestatus/' +message['data']._id + '/' + message['boolean']).subscribe(res => {
          this.loader.hideLoader();
          this.roles.forEach(item=>{
            if(item._id==message['data']['_id']){
              item.isActive=message['boolean'];
            }
          })
        }, err => {
          this.loader.hideLoader();
          this.modal.showModal({'success': false, 'message': 'something went wrong. Please try again'});
        });
      }

    });

  }

  editCategory(location: any) {
    sessionStorage.setItem('role', JSON.stringify(location));
    this.router.navigateByUrl('/edit-role');
  }

  update(i,id,isActive) {

    let json={
      type:'modal',
      confirmType:'Activate',
      data:i,
      id:id,
      boolean:isActive,
      confirm:true,
      'page':'device'
    }
    if(isActive==false){
      json['confirmType']='Deactivate'
    }
    this.modal.showModal(json);
  }
}
