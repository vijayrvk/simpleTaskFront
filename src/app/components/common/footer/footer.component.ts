import {Component, OnInit} from '@angular/core';
import {UtilService} from '../../../services/util.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public util: UtilService) {
  }

  ngOnInit() {
  }

}
