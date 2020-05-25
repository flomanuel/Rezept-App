import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeDetailPageComponent } from './fridge-detail-page.component';

describe('FridgeDetailPageComponent', () => {
  let component: FridgeDetailPageComponent;
  let fixture: ComponentFixture<FridgeDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridgeDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
