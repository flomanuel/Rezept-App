import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { FridgeService } from '../../services/fridge.service';
import { DefaultIngredientService } from '../../services/default-ingredient.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
})
export class SettingsComponent implements OnInit {
  showOverallSettings: boolean;
  showImprint: boolean;
  setupData: object;
  showOverlay: boolean;

  constructor(private localStorageService: LocalStorageService, private fridgeService: FridgeService,
              private defaultIngredientService: DefaultIngredientService) {
  }

  ngOnInit() {
    this.showOverallSettings = false;
    this.showImprint = false;
  }

  openSettings() {
    this.setupData = {
      settings: [
        {
          text: 'Einstellung 1',
          function: () => {
            console.log('Einstellung 1');
            return 0;
          },
        },
        {
          text: 'Einstellung 2',
          function: () => {
            console.log('Einstellung 2');
            return 1;
          },
        },
        {
          text: 'Einstellung 3',
          function: () => {
            console.log('Einstellung 3');
            return 2;
          },
        },
        {
          text: 'Einstellung 4',
          function: () => {
            console.log('Einstellung 4');
            return 3;
          },
        },
      ],
    };
    this.showOverallSettings = true;
  }

  showReset() {
    this.showOverlay = true;
  }

  reset() {
    this.localStorageService.reset();
    this.fridgeService.fridgeIngredients = [];
    this.defaultIngredientService.defaultIngredients = [];
  }

  openImprint() {
    this.showImprint = true;
    this.setupData = {
      settings: [
        {
          text: 'Schulzentrum Utbremen',
          icon: 'record_voice_over',
          function: () => {
            return 0;
          },
        },
        {
          text: 'Meta-Sattler-Straße. 33 28217 Bremen',
          icon: 'place',
          function: () => {
            // Todo open in googleMaps?
            return 0;
          },
        },
        {
          text: 'https://www.szut.de',
          icon: 'web',
          function: () => {
            window.location.href = 'https://www.szut.de';
            return 0;
          },
        },
        {
          text: '368@schulverwaltung.bremen.de',
          icon: 'email',
          function: () => {
            // Todo open in email app?
            return 0;
          },
        },
      ],
    };
  }

  goBack() {
    this.showOverallSettings = false;
    this.showImprint = false;
  }

  removeItemFromArrayByValue(arr, value) {
    return arr.filter((ele) => {
      return ele !== value;
    });
  }

  onInput() {
    // Todo suggest an ingredient?
  }
}
