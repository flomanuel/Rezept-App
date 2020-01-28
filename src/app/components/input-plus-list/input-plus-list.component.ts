import { Component, ComponentFactoryResolver, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Ingredient } from '../../Entity/ingredient.class';
import { BasicIngredientComponent } from './basic-ingredient/basic-ingredient.component';

@Component({
  selector: 'app-input-plus-list',
  templateUrl: './input-plus-list.component.html',
  styleUrls: ['./input-plus-list.component.less'],
})
export class InputPlusListComponent {
  @ViewChild('inputs', { static: false, read: ViewContainerRef }) inputs: ViewContainerRef;
  @Output() onIngredient: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  constructor(private readonly resolver: ComponentFactoryResolver) {
  }

  // Inserts a new BasicIngredientComponent to current inputs for more ingredients
  newInput() {
    const child = this.resolver.resolveComponentFactory(BasicIngredientComponent);
    this.inputs.createComponent(child);
  }

  ingredientsHandler(ingredients: Ingredient[]): void {
    this.onIngredient.emit(ingredients);
  }
}
