import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  private mainImagePath: string;

  constructor() {
    this.mainImagePath = 'assets/logo/logo_noText.svg';
  }

  ngOnInit() {
  }

}
