import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class MarketSearchComponent implements OnInit, OnDestroy {

  constructor() {
  }

  public longitude: number;
  public latitude: number;
  public coords: Coordinates;

  map: any;

  ermittlePosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.coords = position.coords;
      });
    } else {
      console.log('Ihr Browser unterstützt keine Geolocation.');
    }
    this.setCenter(this.coords.longitude, this.coords.latitude);
  }
  zeigePosition(position) {
    console.log('Ihre Koordinaten sind: Breite: ' + position.coords.latitude + ' Länge: ' + position.coords.longitude);
  }

  ngOnInit() {
    document.body.style.margin = '0';
    this.InitMap();
  }

  ngOnDestroy() {
    document.body.style.margin = '8px';
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
    document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].remove();

  }
  setCenter(longitude: number , latitude: number) {
    console.log('Ihre Koordinaten werden auf: Breite: ' + latitude + ' Länge: ' + longitude + ' gesetzt');
    const view = this.map.getView();
    view.setCenter(proj.fromLonLat([longitude, latitude]));
    view.setZoom(17);
  }
}

