import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingStepsDetailPageComponent } from './cooking-steps-detail-page.component';

describe('CookingStepsDetailPageComponent', () => {
  let component: CookingStepsDetailPageComponent;
  let fixture: ComponentFixture<CookingStepsDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookingStepsDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookingStepsDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
