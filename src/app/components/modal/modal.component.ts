import {Component, OnInit} from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  message:any = {text:'',confirmType:''};
  successModal = false;
  errorModal = false;
  confirmModal=false;

  constructor(public dataService: DataServiceService, public util: UtilService) {
    this.dataService.currentMessage.subscribe(message => {
      if (message != 'default message') {
        message = JSON.parse(message);
        if (message['type'] == 'modal' && message['success']) {
          this.message['text'] = message['message'];
          this.successModal = true;
        }
        if (message['type'] == 'modal' && message['success'] == false) {
          if (message['message']) {
            this.message['text'] = message['message'];
          }
          this.errorModal = true;
        }

        if(message['type']=='modal' && message['confirm']){

          if(message['confirmType']){
            this.message=message;
          }
          this.confirmModal = true;
        }
      }

    });
  }

  confirmAction(){
    this.message['process']=true;
    this.dataService.changeMessage(JSON.stringify(this.message));
    this.confirmModal=false;
  }

  closeModal() {
    this.errorModal = false;
    this.successModal = false;
    this.confirmModal=false;
  }

  ngOnInit() {
  }

}
