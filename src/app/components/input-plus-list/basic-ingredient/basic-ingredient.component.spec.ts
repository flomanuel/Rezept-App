import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicIngredientComponent } from './basic-ingredient.component';

describe('BasicIngredientComponent', () => {
  let component: BasicIngredientComponent;
  let fixture: ComponentFixture<BasicIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
