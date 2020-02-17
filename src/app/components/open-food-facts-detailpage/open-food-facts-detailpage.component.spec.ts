import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFoodFactsDetailpageComponent } from './open-food-facts-detailpage.component';

describe('OpenFoodFactsDetailpageComponent', () => {
  let component: OpenFoodFactsDetailpageComponent;
  let fixture: ComponentFixture<OpenFoodFactsDetailpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenFoodFactsDetailpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenFoodFactsDetailpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
