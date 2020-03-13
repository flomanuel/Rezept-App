import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.less']
})
export class ActionModalComponent implements OnInit, OnDestroy {
  private readonly element: any;
  @Input() message!: string;
  @Input() color: string;
  @Output() eventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.element.querySelector('#no').style.backgroundColor = this.color;
    this.element.querySelector('#yes').style.backgroundColor = this.color;
  }

  ngOnDestroy(): void {
    this.element.remove();
  }

  emit(choice: boolean) {
    this.eventEmitter.emit(choice);
  }
}
