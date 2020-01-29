import { Component, OnInit } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrls: ['./market-search.component.css']
})
export class MarketSearchComponent implements OnInit {

  constructor() {
    this.TestString = 'test';
  }

  public TestString: string;


  map: any;

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
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([8.7959733, 53.0891505]),
        zoom: 17
      })
    });
  }
}
