import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VolumeUnit } from '../../types';
import { Ingredient } from '../../entity/ingredient.class';

@Component({
  selector: 'app-input-plus-list',
  templateUrl: './input-plus-list.component.html',
  styleUrls: ['./input-plus-list.component.less'],
})
export class InputPlusListComponent {
  private readonly fileVolumeUnits: string[] = Object.values(VolumeUnit);
  @Input() items!: Ingredient[];
  @Output() itemsEmitter: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  constructor() {
  }

  newInput(): void {
    this.itemsEmitter.emit(this.items);
    this.items.push(new Ingredient('', 0, '', 0, ''));
  }

  removeInput(index: number): void {
    this.items.splice(index, 1);
    this.itemsEmitter.emit(this.items);
  }
}
