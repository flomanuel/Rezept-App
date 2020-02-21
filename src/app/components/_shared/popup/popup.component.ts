import { Component, Input, OnInit } from '@angular/core';
import { PopupType } from '../../../types';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  animations: [
    trigger('popup', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
  styleUrls: ['./popup.component.less'],
})
export class PopupComponent implements OnInit {
  @Input() title = '';
  @Input() message!: string;
  @Input() status: PopupType = PopupType.INFO;

  constructor() {
  }

  ngOnInit() {
    if (this.status === PopupType.INFO) {
      // @ts-ignore
      document.querySelector('.wrapper').style.backgroundColor = '#5E97F6';
    }

    if (this.status === PopupType.SUCCESS) {
      // @ts-ignore
      document.querySelector('.wrapper').style.backgroundColor = '#97ff65';
    }

    if (this.status === PopupType.DANGER) {
      // @ts-ignore
      document.querySelector('.wrapper').style.backgroundColor = '#cc0e09';
    }
  }
}
