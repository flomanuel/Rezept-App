import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-open-food-facts-detailpage',
  templateUrl: './open-food-facts-detailpage.component.html',
  styleUrls: ['./open-food-facts-detailpage.component.less'],
})
export class OpenFoodFactsDetailpageComponent implements OnInit {

  private foodFacts: any;
  private ean: string;
  private foodFactsURL = 'https://world.openfoodfacts.org/api/v0/product/[barcode].json';

  constructor(private getRouteParams: ActivatedRoute) {
    this.getRouteParams.paramMap.subscribe(params => {
      this.ean = params.get('ean');
    });
    /* todo: use Angulars http client (https://angular.io/guide/http) */
    this.getResponse().then((xmlHttp) => {
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          const parsedJSON = JSON.parse(xmlHttp.responseText);
          if (parsedJSON.status_verbose === 'product found') {
            this.foodFacts = parsedJSON;
          }
          console.log(this.foodFacts);
        }
      };
    });
  }

  ngOnInit() {
  }

  getResponse(): Promise<XMLHttpRequest> {
    const url = this.foodFactsURL.replace('[barcode]', this.ean);
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, true);
    xmlHttp.send(null);

    return new Promise<XMLHttpRequest>((resolve) => {
      resolve(xmlHttp);
    });
  }
}
