import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.authenticateAnonymousUser().catch();
  }
  title = 'rezeptApp';
}
