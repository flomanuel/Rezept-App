import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientSetupModalComponent } from './ingredient-setup-modal.component';

describe('IngredientSetupModalComponent', () => {
  let component: IngredientSetupModalComponent;
  let fixture: ComponentFixture<IngredientSetupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientSetupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientSetupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
