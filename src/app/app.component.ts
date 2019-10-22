import {Component} from '@angular/core';
import {DataServiceService} from './services/data-service.service';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'API Registration';

  constructor(public dataService: DataServiceService,
              private viewportScroller: ViewportScroller
  ) {
    this.viewportScroller;

  }
}
