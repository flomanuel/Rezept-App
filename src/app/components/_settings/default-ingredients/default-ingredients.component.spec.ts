import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultIngredientsComponent } from './default-ingredients.component';

describe('DefaultIngredientsComponent', () => {
  let component: DefaultIngredientsComponent;
  let fixture: ComponentFixture<DefaultIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
