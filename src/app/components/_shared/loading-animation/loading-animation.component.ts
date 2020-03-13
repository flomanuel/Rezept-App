import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.less'],
})
export class LoadingAnimationComponent implements OnInit {

  @Input() 'description' = 'Bitte haben Sie einen Moment Geduld, die Suche läuft.';

  constructor() {
  }

  ngOnInit() {
  }

}
