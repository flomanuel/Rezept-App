import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientInputPlusListComponent } from './ingredient-input-plus-list.component';

describe('InputPlusListComponent', () => {
  let component: IngredientInputPlusListComponent;
  let fixture: ComponentFixture<IngredientInputPlusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientInputPlusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientInputPlusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
