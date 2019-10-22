import {Injectable} from '@angular/core';
import {DataServiceService} from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dataService: DataServiceService) {
  }

  showModal = (json) => {
    json['type'] = 'modal';
    this.dataService.changeMessage(JSON.stringify(json));
  };



}
