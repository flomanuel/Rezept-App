import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPlusListComponent } from './input-plus-list.component';

describe('InputPlusListComponent', () => {
  let component: InputPlusListComponent;
  let fixture: ComponentFixture<InputPlusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPlusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPlusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
