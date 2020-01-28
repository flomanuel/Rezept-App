import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrls: ['./market-search.component.css']
})
export class MarketSearchComponent implements OnInit {

  public TestString: string;
  public Test: any;
  public successCallback: any;

  constructor() {
    this.TestString = 'test';
  }

  ermittlePosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.zeigePosition);
    } else {
      // ausgabe.innerHTML = 'Ihr Browser unterstützt keine Geolocation.';
    }
  }
  zeigePosition(position) {
    // this.TestString = 'Ihre Koordinaten sind: Breite: ' + position.coords.latitude + 'Länge: ' + position.coords.longitude;
    // tslint:disable-next-line:max-line-length
    document.getElementsByClassName('text')[0].innerHTML = 'Ihre Koordinaten sind: Breite: ' + position.coords.latitude + 'Länge: ' + position.coords.longitude;
  }

  ngOnInit() {
  }

}
