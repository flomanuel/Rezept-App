import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-plus-list',
  templateUrl: './input-plus-list.component.html',
  styleUrls: ['./input-plus-list.component.less']
})
export class InputPlusListComponent implements OnInit {
  @Input() private items!: string[];
  @Input() private name!: string;

  @Output() private readonly itemEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  get listItems(): string[] {
    return Array.isArray(this.items) ? this.items : [];
  }

  onAdd(): void {
    this.items.push('');
  }

  onRemove(index: number) {
    this.items.splice(index, 1);
  }

  emitItems(): void {
    this.itemEmitter.emit(this.items);
  }

  trackByIndex(index: number, obj: any): number {
    return index;
  }
}
