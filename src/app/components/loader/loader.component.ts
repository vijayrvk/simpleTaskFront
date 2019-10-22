import {Component, OnInit} from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  load = false;

  constructor(public dataService: DataServiceService, public util: UtilService,) {
    this.dataService.currentMessage.subscribe(message => {
      if (message != 'default message') {
        message = JSON.parse(message);

        if (message['type'] == 'loader' && message['show']) {
          this.load = message['show'];
        } else if (message['type'] == 'loader' && message['show'] == false) {
          this.load = message['show'];
        }
      }
    });
  }

  ngOnInit() {
  }

}
