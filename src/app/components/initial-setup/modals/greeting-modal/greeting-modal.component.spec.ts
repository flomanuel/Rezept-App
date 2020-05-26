import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingModalComponent } from './greeting-modal.component';

describe('GreetingModalComponent', () => {
  let component: GreetingModalComponent;
  let fixture: ComponentFixture<GreetingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreetingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
