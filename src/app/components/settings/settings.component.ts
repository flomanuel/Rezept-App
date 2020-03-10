import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../settings/settings.component.less'],
})
export class SettingsComponent implements OnInit {
  showOverallSettings: boolean;
  showDefaultIngredientsSetting: boolean;
  showImprint: boolean;
  setupData: object;
  showOverlay: boolean;

  constructor() {
  }

  ngOnInit() {
    this.showOverallSettings = false;
    this.showDefaultIngredientsSetting = false;
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
          }
        },
        {
          text: 'Einstellung 2',
          function: () => {
            console.log('Einstellung 2');
            return 1;
          }
        },
        {
          text: 'Einstellung 3',
          function: () => {
            console.log('Einstellung 3');
            return 2;
          }
        },
        {
          text: 'Einstellung 4',
          function: () => {
            console.log('Einstellung 4');
            return 3;
          }
        }
      ]
    };
    this.showOverallSettings = true;
  }

  openDefaultIngredientsSettings() {
    this.setupData = {
      settings: [
        {
          text: 'Salz',
          function: () => {
            console.log('Salz');
            return 0;
          }
        },
        {
          text: 'Pfeffer',
          function: () => {
            console.log('Pfeffer');
            return 1;
          }
        },
        {
          text: 'Milch',
          function: () => {
            console.log('Milch');
            return 1;
          }
        },
        {
          text: 'Gewürz XY',
          function: () => {
            console.log('Gewürz XY');
            return 1;
          }
        }
      ]
    };
    this.showDefaultIngredientsSetting = true;
  }

  reset() {
    console.log('reset');
    this.showOverlay = true;
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
          }
        },
        {
          text: 'Meta-Sattler-Straße. 33 28217 Bremen',
          icon: 'place',
          function: () => {
            return 0;
          }
        },
        {
          text: 'https://www.szut.de',
          icon: 'web',
          function: () => {
            return 0;
          }
        },
        {
          text: '368@schulverwaltung.bremen.de',
          icon: 'email',
          function: () => {
            return 0;
          }
        },
      ]
    };
  }

  goBack() {
    this.showOverallSettings = false;
    this.showDefaultIngredientsSetting = false;
    this.showImprint = false;
  }

  popIngredientsWindowUp() {
    console.log('addDefaultIngredients');
  }
}
