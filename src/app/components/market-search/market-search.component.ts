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
  public limit = 5;
  public radius = 0.9;
  private nominatimURL = 'https://nominatim.openstreetmap.org/?adressdetails=1' +
    '&q=[suche]' +
    '&format=json' +
    '&limit=[limit]' +
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
      this.findMarkets();
    });
  }


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
    this.locationsSubscription.unsubscribe();
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

  setCenter(longitude: number, latitude: number, zoom: number = 18) {
    const view = this.map.getView();
    view.setCenter(proj.fromLonLat([longitude, latitude]));
    view.setZoom(zoom);
  }

  findMarkets() {
    this.getResponse();
  }

  getResponse() {
    let url = this.nominatimURL;
    const coords = this.GetBoundingBox(this.geoLocation.longitude, this.geoLocation.latitude, this.radius);
    url = url.replace('[suche]', '[supermarket]');
    url = url.replace('[limit]', this.limit.toString());
    url = url.replace('[top]', (coords.top).toString());
    url = url.replace('[right]', (coords.right).toString());
    url = url.replace('[bottom]', (coords.bottom).toString());
    url = url.replace('[left]', (coords.left).toString());

    // console.log(url);

    if (this.markets) {
      this.markets.length = 0;
    }

    this.jsonRequestService.getMarket(url)
      .subscribe((market) => {
        this.markets = market;
        for (const mark of this.markets) {
          mark.distance = this.distance(mark.lat, mark.lon, this.geoLocation.latitude, this.geoLocation.longitude);
        }
        this.markets.sort((a, b) => a.distance - b.distance);
        let index = 0;
        for (const mark of this.markets) {
          index++;
          mark.index = index;
        }
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
    elementPos.innerHTML = '<img src="../../../assets/objects/marker/marker_pos.png" alt="markericon"/>';
    const markerPos = new Overlay({
      position: proj.fromLonLat([this.geoLocation.longitude, this.geoLocation.latitude]),
      positioning: OverlayPositioning.CENTER_CENTER,
      element: elementPos,
      stopEvent: false,
    });
    this.map.addOverlay(markerPos);

    // Neue/Aktualisierte Overlays/Marker hinzufügen
    if (this.markets) {
      let index = 0;
      for (const markets of this.markets) {
        index++;
        const element = document.createElement('div');
        element.innerHTML = '<img src="../../../assets/objects/marker/marker_' + index + '.png" alt="markericon"/>';
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

