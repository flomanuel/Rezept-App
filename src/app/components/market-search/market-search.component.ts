import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';


@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrls: ['./market-search.component.less']
})
export class MarketSearchComponent implements OnInit {

  constructor() {
  }

  public longitude: number;
  public latitude: number;
  public coords: Coordinates;

  map: any;

  ermittlePosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.zeigePosition);
      this.setCenter(this.coords.longitude, this.coords.latitude);
    } else {
      console.log('Ihr Browser unterstützt keine Geolocation.');
    }
  }
  zeigePosition(position): Coordinates {
    console.log('Ihre Koordinaten sind: Breite: ' + position.coords.latitude + ' Länge: ' + position.coords.longitude);
    return position.coords;
  }

  ngOnInit() {
    document.body.style.margin = '0';
    this.InitMap();
  }

  InitMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        center: proj.fromLonLat([8.7959733, 53.0891505]),
        zoom: 17
      })
    });
  }
  setCenter(longitude: number , latitude: number) {
    console.log('Ihre Koordinaten werden auf: Breite: ' + latitude + ' Länge: ' + longitude + ' gesetzt');
    const view = this.map.getView();
    view.setCenter(proj.fromLonLat([longitude, latitude]));
    view.setZoom(17);
  }
}

