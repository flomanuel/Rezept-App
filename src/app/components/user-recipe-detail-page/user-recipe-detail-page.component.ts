import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../entity/recipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-recipe-detail-page',
  templateUrl: './user-recipe-detail-page.component.html',
  styleUrls: ['./user-recipe-detail-page.component.less'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class UserRecipeDetailPageComponent implements OnInit {
  @Input() private recipe!: Recipe;

  @Output() private closeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  emitClose(): void {
    this.closeEmitter.emit(false);
  }
}
