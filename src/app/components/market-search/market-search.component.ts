import { Component, OnDestroy, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';
import Overlay from 'ol/Overlay';
import { JsonRequestService } from '../../services/json-request.service';
import { Market } from './market.model';
import OverlayPositioning from 'ol/OverlayPositioning';


@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrls: ['./market-search.component.less'],
})
export class MarketSearchComponent implements OnInit, OnDestroy {


  constructor(private jsonRequestService: JsonRequestService) {

  }

  public coords: Coordinates;
  private nominatimURL = 'https://nominatim.openstreetmap.org/?adressdetails=1' +
    '&q=[suche]' +
    '&format=json' +
    '&limit=5' +
    '&viewbox=[top],[right],[bottom],[left]' +
    '&bounded=1';
  public data: any;

  markets: Market[];
  map: any;

  ermittlePosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.coords = position.coords;
      });
    } else {
      console.log('Ihr Browser unterstützt keine Geolocation.');
    }
    // this.setCenter(this.coords.longitude, this.coords.latitude);
  }

  zeigePosition(position) {
    console.log('Ihre Koordinaten sind: Breite: ' + position.coords.latitude + ' Länge: ' + position.coords.longitude);
  }

  ngOnInit() {
    document.body.style.margin = '0';
    this.ermittlePosition();
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
          source: new OSM(),
        }),
      ],
      view: new View({
        center: proj.fromLonLat([8.7959733, 53.0891505]),
        zoom: 17,
      }),
    });
    document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].remove();
    // document.getElementsByClassName('ol-overlaycontainer-stopevent')[0].remove();

  }

  setCenter(longitude: number, latitude: number) {
    this.ermittlePosition();
    this.findMarkets(0, 0);
    console.log('Ihre Koordinaten werden auf: Breite: ' + latitude + ' Länge: ' + longitude + ' gesetzt');
    const view = this.map.getView();
    view.setCenter(proj.fromLonLat([longitude, latitude]));
    view.setZoom(18);
  }

  findMarkets(longitude: number, latitude: number) {
    this.getResponse();
  }

  parseJsonString() {


  }

  getResponse() {
    let url = this.nominatimURL;
    url = url.replace('[suche]', '[supermarket]');
    url = url.replace('[top]', (this.coords.longitude + 0.1).toString());
    url = url.replace('[right]', (this.coords.latitude + 0.01).toString());
    url = url.replace('[bottom]', (this.coords.longitude - 0.1).toString());
    url = url.replace('[left]', (this.coords.latitude - 0.01).toString());

    console.log((this.coords.longitude + 0.1).toString());
    console.log((this.coords.latitude + 0.1).toString());
    console.log((this.coords.longitude - 0.1).toString());
    console.log((this.coords.latitude - 0.1).toString());
    console.log(url);

    console.log(this.LatLonInKm(this.coords.latitude, this.coords.longitude));

    this.jsonRequestService.getMarket(url)
      .subscribe(market => this.markets = market);

    this.setMarker();
  }

  stringToFloat(str: string): number {
    return parseFloat(str);
  }

  setMarker() {
    // Alte Overlays/Marker Löschen
    const overlays = this.map.getOverlays();
    for (let i = 0; i < overlays.getLength(); i++) {
      this.map.getOverlays().removeAt(i);
    }

    // Neue/Aktualisierte Overlays/Marker hinzufügen
    if (this.markets) {
      for (const markets of this.markets) {
        const element = document.createElement('div');
        element.innerHTML = '<img src="https://firebasestorage.googleapis.com/v0/b/rezept-app-458e9.appspot.com' +
          '/o/marker.png?alt=media&token=7e31f20b-98cc-4b1e-89f5-64a08397b776" />';
        const marker = new Overlay({
          position: proj.fromLonLat([this.stringToFloat(markets.lon), this.stringToFloat(markets.lat)]),
          positioning: OverlayPositioning.CENTER_CENTER,
          element,
          stopEvent: false,
        });
        this.map.addOverlay(marker);
      }
    }
  }

  LatLonInKm(latitude: number, longitude: number) {
    const latKm = latitude * 111.0;
    const lonKm = Math.cos(latitude * 0.01745329252) * 111.0;
    const coords = [lonKm, latKm];
    return coords;
  }

  KmInLat(kmNumber: number) {
    const num = kmNumber / 111.0;
    return num;
  }
}

