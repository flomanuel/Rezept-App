import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectModalComponent } from './multiselect-modal.component';

describe('MultiselectModalComponent', () => {
  let component: MultiselectModalComponent;
  let fixture: ComponentFixture<MultiselectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
