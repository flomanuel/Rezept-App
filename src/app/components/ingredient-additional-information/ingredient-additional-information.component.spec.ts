import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientAdditionalInformationComponent } from './ingredient-additional-information.component';

describe('IngredientAdditionalInformationComponent', () => {
  let component: IngredientAdditionalInformationComponent;
  let fixture: ComponentFixture<IngredientAdditionalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientAdditionalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientAdditionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
