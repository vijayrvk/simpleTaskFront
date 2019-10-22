import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import {
  ModalService
} from '../../../services/modal.service';
import {
  Router
} from '@angular/router';
import {
  LoaderService
} from '../../../services/loader.service';
import {
  DataServiceService
} from '../../../services/data-service.service';
import {
  HttpServiceService
} from '../../../services/http-service.service';
import {
  UtilService
} from '../../../services/util.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  users = [];
  locations = [];
  roles = [];

  constructor(private formBuilder: FormBuilder,
    public modal: ModalService,
    public router: Router,
    public loader: LoaderService,
    public util: UtilService,
    public dataService: DataServiceService,
    public httpService: HttpServiceService) {
    this.loader.showLoader();
  }

  ngOnInit() {
    this.getRoles().then(res => {
      if (res) {
        this.httpService.postApi({
          isActive: true
        }, 'user/getUserCondition').subscribe(res => {
          this.loader.hideLoader();
          if (res.success) {
            this.users = res.data;
          } else {
            this.users = [];
          }
          console.log(res);
        }, err => {
          this.loader.hideLoader();
          this.users = [];
        });
      }
    }).catch(err => {
      this.loader.hideLoader();
      this.modal.showModal({
        'success': false,
        'message': 'something went wrong. Please try again'
      });
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

  

  editData(user: any) {
    this.util.storeJson('user', user);
    this.router.navigateByUrl('/edit-user');
  }


  getRoleName(data: any) {
    let name;
    this.roles.forEach(role => {
      if (role._id == data) {
        name = role.name;
      }
    });
    return name;
  }
}
