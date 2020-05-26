import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-greeting-modal',
  templateUrl: './greeting-modal.component.html',
  styleUrls: ['./greeting-modal.component.less']
})
export class GreetingModalComponent implements OnInit {
  @Output() choiceEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  emit(choice: boolean) {
    this.choiceEmitter.emit(choice);
  }
}
