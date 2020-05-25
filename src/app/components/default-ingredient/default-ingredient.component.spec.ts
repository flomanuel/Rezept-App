import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultIngredientComponent } from './default-ingredient.component';

describe('DefaultIngredientComponent', () => {
  let component: DefaultIngredientComponent;
  let fixture: ComponentFixture<DefaultIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
