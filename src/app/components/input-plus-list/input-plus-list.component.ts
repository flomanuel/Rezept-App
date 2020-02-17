import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BasicIngredientComponent } from './basic-ingredient/basic-ingredient.component';

@Component({
  selector: 'app-input-plus-list',
  templateUrl: './input-plus-list.component.html',
  styleUrls: ['./input-plus-list.component.less'],
})
export class InputPlusListComponent implements OnInit {
  @ViewChild('inputs', { static: false, read: ViewContainerRef }) inputs: ViewContainerRef;
  private showRemoveBtn = false;

  ngOnInit(): void {
  }

  constructor(private readonly resolver: ComponentFactoryResolver) {
  }

  // Inserts a new BasicIngredientComponent to current inputs for more ingredients
  newInput() {
    const child = this.resolver.resolveComponentFactory(BasicIngredientComponent);
    this.inputs.createComponent(child);
    if (this.inputs.length > 0) {
      this.showRemoveBtn = true;
    }
  }

  removeInput() {
    this.inputs.detach(this.inputs.length - 1);
    if (this.inputs.length === 0) {
      this.showRemoveBtn = false;
    }
  }
}
