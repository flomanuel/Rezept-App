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
import { Observable } from 'rxjs';


@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrls: ['./market-search.component.less'],
})
export class MarketSearchComponent implements OnInit, OnDestroy {


  constructor(private jsonRequestService: JsonRequestService) {

  }

  public geoLocation: Coordinates;
  private nominatimURL = 'https://nominatim.openstreetmap.org/?adressdetails=1' +
    '&q=[suche]' +
    '&format=json' +
    '&limit=5' +
    '&viewbox=[top],[right],[bottom],[left]' +
    '&bounded=1' +
    '&extratags=1';

  private bFistGeoLocation = true;
  markets: Market[];
  map: any;
  locationsSubscription;

  locations = new Observable((observer) => {
    let watchId: number;

    // Simple geolocation API check provides values to publish
    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition((position: Position) => {
        observer.next(position);
      }, (error: PositionError) => {
        observer.error(error);
      });
    } else {
      observer.error('Geolocation not available');
    }

    // When the consumer unsubscribes, clean up data ready for next subscription.
    return {
      unsubscribe() {
        navigator.geolocation.clearWatch(watchId);
      },
    };
  });

  ermittlePosition() {
    this.locationsSubscription = this.locations.subscribe((position: Position) => {
      this.geoLocation = position.coords;
      console.log(this.geoLocation);
      if (this.bFistGeoLocation) {
        this.setCenter(this.geoLocation.longitude, this.geoLocation.latitude);
        this.bFistGeoLocation = false;
      }
      this.findMarkets(this.geoLocation.longitude, this.geoLocation.latitude);
    });
    // {
    //  next(position: Position) {
    //    console.log('Current Position: ', position);
    //    console.log(this.geoLocation);
    //  },
    //  error(msg) {
    //    console.log('Error Getting Location: ', msg);
    //  }
    // );
    // return this.geoLocation;
  }

  // Promise<Coordinates> {

  // let coords: Coordinates;
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     coords = position.coords;
  //   });
  // } else {
  //   console.log('Ihr Browser unterstützt keine Geolocation.');
  // }
  // return new Promise<Coordinates>((resolve) => {
  //   resolve(coords);
  // });
  // }

  zeigePosition() {
    console.log('Ihre Koordinaten sind: Breite: ' + this.geoLocation.latitude + ' Länge: ' + this.geoLocation.longitude);
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
        center: proj.fromLonLat([0, 0]),
        zoom: 17,
      }),
    });
    // document.getElementsByClassName('ol-zoom ol-unselectable ol-control')[0].remove();
    document.getElementsByClassName('ol-overlaycontainer-stopevent')[0].remove();

  }

  setCenter(longitude: number, latitude: number) {
    console.log('Ihre Koordinaten werden auf: Breite: ' + latitude + ' Länge: ' + longitude + ' gesetzt');
    const view = this.map.getView();
    view.setCenter(proj.fromLonLat([longitude, latitude]));
    view.setZoom(18);
  }

  findMarkets(longitude: number, latitude: number) {
    this.getResponse();
  }

  getResponse() {
    let url = this.nominatimURL;
    const coords = this.GetBoundingBox(this.geoLocation.longitude, this.geoLocation.latitude, 0.9);
    url = url.replace('[suche]', '[supermarket]');
    url = url.replace('[top]', (coords.top).toString());
    url = url.replace('[right]', (coords.right).toString());
    url = url.replace('[bottom]', (coords.bottom).toString());
    url = url.replace('[left]', (coords.left).toString());

    // console.log('Top: ' + (coords.top).toString());
    // console.log('Left: ' + (coords.left).toString());
    // console.log('Bottom: ' + (coords.bottom).toString());
    // console.log('Right: ' + (coords.right).toString());
    // console.log('Distanz zwischen Top/Left und Bottom/Right: '
    // + this.distance(coords.left, coords.top, coords.right, coords.bottom).toString());
    // console.log('Distanz zwischen Top/Left und Bottom/Left: '
    // + this.distance(coords.left, coords.top, coords.left, coords.bottom).toString());


    console.log(url);

    if (this.markets) {
      this.markets.length = 0;
    }

    this.jsonRequestService.getMarket(url)
      .subscribe((market) => {
        this.markets = market;
        this.setMarker();
      });
  }

  stringToFloat(str: string): number {
    return parseFloat(str);
  }

  deleteAllMarker() {
    // Alte Overlays/Marker Löschen
    const overlays = this.map.getOverlays();
    for (let i = 0; i < overlays.getLength(); i++) {
      this.map.getOverlays().removeAt(i);
    }
  }
  setMarker() {
    this.deleteAllMarker();

    // Eigene Position anzeigen
    const elementPos = document.createElement('div');
    elementPos.innerHTML = '<img src="https://firebasestorage.googleapis.com/v0/b/rezept-app-458e9.appspot.com/o/' +
      'marker%20eigene%20pos.png?alt=media&token=df6461ab-4377-429e-bce4-891d762bf65a" />';
    const markerPos = new Overlay({
      position: proj.fromLonLat([this.geoLocation.longitude, this.geoLocation.latitude]),
      positioning: OverlayPositioning.CENTER_CENTER,
      element: elementPos,
      stopEvent: false,
    });
    this.map.addOverlay(markerPos);

    // Neue/Aktualisierte Overlays/Marker hinzufügen
    if (this.markets) {
       for (const markets of this.markets) {
        const element = document.createElement('div');
        element.innerHTML = '<img src="https://firebasestorage.googleapis.com/v0/b/rezept-app-458e9.appspot.com/o/' +
          'Map%20Marker%20Store2.png?alt=media&token=edd316a4-b295-4c75-afb3-e9dfcc6855f9" />';
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

  distance(lat1, lon1, lat2, lon2) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    } else {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }
  }

  GetBoundingBox(longitude: number, latitude: number, radius: number) {
    const dY = (radius / 6371) * (180 / Math.PI);   // 6371 = Radius der Erde in km
    const dX = (radius / (6371 * Math.cos(latitude * (Math.PI / 180.0)))) * (180 / Math.PI);

    return { top: longitude - dX, left: latitude - dY, bottom: longitude + dX, right: latitude + dY };
  }
}

