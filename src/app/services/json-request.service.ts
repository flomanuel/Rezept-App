import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Market } from '../components/market-search/market.model';

@Injectable({
  providedIn: 'root',
})
export class JsonRequestService {

  constructor(private http: HttpClient) {
  }

  getMarket(url: string) {
    return this.http.get<Market[]>(url);
  }
}
