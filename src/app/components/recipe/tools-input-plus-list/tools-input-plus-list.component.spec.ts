import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsInputPlusListComponent } from './tools-input-plus-list.component';

describe('ToolsInputPlusListComponent', () => {
  let component: ToolsInputPlusListComponent;
  let fixture: ComponentFixture<ToolsInputPlusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsInputPlusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsInputPlusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
