import {Injectable} from '@angular/core';
import {DataServiceService} from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public dataService: DataServiceService) {
  }

  showLoader = () => {
    let json = {};
    json['type'] = 'loader';
    json['show'] = true;
    this.dataService.changeMessage(JSON.stringify(json));
  };

  hideLoader = () => {
    let json = {};
    json['type'] = 'loader';
    json['show'] = false;
    this.dataService.changeMessage(JSON.stringify(json));
  };
}
