import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ModalService } from '../../services/modal.service';
import { localStorageKeys } from '../../../config';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.component.html',
  styleUrls: ['./initial-setup.component.less'],
})
export class InitialSetupComponent implements OnInit {
  private showGreet = true;
  private setBasics = false;

  constructor(private readonly localStorageService: LocalStorageService, private readonly modalService: ModalService) {
  }

  ngOnInit() {
  }

  private willSetBasicIngredients(willSetBasics: boolean) {
    if (willSetBasics) {
      this.showGreet = false;
      this.setBasics = true;
    } else {
      this.localStorageService.setItem(localStorageKeys.INITIAL_SETUP, []);
    }
  }
}
