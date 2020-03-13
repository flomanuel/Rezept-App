import {Component, OnInit} from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  private mainImagePath: string;

  constructor(private readonly localStorageService: LocalStorageService) {
    this.mainImagePath = 'assets/logo/logo_noText.svg';
  }

  ngOnInit() {
  }
}
