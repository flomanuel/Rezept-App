import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
})
export class SettingsComponent implements OnInit {
  showOverallSettings: boolean;
  showDefaultIngredientsSetting: boolean;
  showImprint: boolean;
  setupData: object;
  showOverlay: boolean;
  addNewDefaultIngredient: boolean;
  defaultIngredients: any;
  defaultIngredientInput: any;
  showAlreadyInDefaultIngredientsListError: boolean;
  showDefaultIngredientsMenu: boolean;
  itemMenuIndexAt: number;
  ingredientAt: any;

  constructor(
    private localStorageService: LocalStorageService,
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.showOverallSettings = false;
    this.showDefaultIngredientsSetting = false;
    this.showImprint = false;
    this.defaultIngredients = [];
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

  openDefaultIngredientsSettings() {
    localStorage.defaultIngredients = JSON.stringify(this.defaultIngredients);
    const settings = [];
    let index = 0;
    let defaultIngredients: any = (localStorage.getItem('defaultIngredients'));
    if (defaultIngredients !== '') {
      defaultIngredients = JSON.parse(defaultIngredients);
      for (const defaultIngredient of defaultIngredients) {
        settings.push({
          text: defaultIngredient,
          function: () => {
            // Todo showUp option to delete from list or maybe even try to implement archiving style from GMail(swiping)
            this.ingredientAt = defaultIngredient;
            this.showAlreadyInDefaultIngredientsListError = false;
            console.log(defaultIngredient);
            this.showDefaultIngredientsMenu = true;
            this.itemMenuIndexAt = index;
            return 0;
          },
        });
        index++;
      }
    }
    this.setupData = {
      settings,
    };
    this.showDefaultIngredientsSetting = true;
  }

  showReset() {
    this.showOverlay = true;
  }

  reset() {
    this.defaultIngredients = [];
    this.localStorageService.reset();
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
    this.showDefaultIngredientsSetting = false;
    this.showImprint = false;
    this.showAlreadyInDefaultIngredientsListError = false;
  }

  popIngredientsWindowUp() {
    this.showAlreadyInDefaultIngredientsListError = false;
    this.addNewDefaultIngredient = true;
    console.log('addDefaultIngredients');
  }

  addDefaultIngredient() { // Todo save and fill with ids as key?
    if (JSON.parse(localStorage.defaultIngredients).includes(this.defaultIngredientInput) ||
      this.defaultIngredientInput === '' || this.defaultIngredientInput === undefined) {
      this.addNewDefaultIngredient = false;
      this.showAlreadyInDefaultIngredientsListError = true;
    } else {
      this.defaultIngredients.push(this.defaultIngredientInput.toString());
      localStorage.defaultIngredients = JSON.stringify(this.defaultIngredients);
      this.addNewDefaultIngredient = false;
      this.openDefaultIngredientsSettings();
    }
  }

  removeDefaultIngredient(defaultIngredient: any) {
    this.defaultIngredients = this.removeItemFromArrayByValue(
      JSON.parse(localStorage.defaultIngredients), defaultIngredient,
    );
    localStorage.defaultIngredients = this.defaultIngredients;
    this.openDefaultIngredientsSettings();
  }

  removeItemFromArrayByValue(arr, value) {
    return arr.filter((ele) => {
      return ele !== value;
    });
  }

  onInput() {
    const suggestion = this.dataService.searchRecipesByParams(this.defaultIngredientInput);
    console.log(suggestion);
    return suggestion;
  }
}
