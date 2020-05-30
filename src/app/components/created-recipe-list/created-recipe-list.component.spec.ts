import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedRecipeListComponent } from './created-recipe-list.component';

describe('CreatedRecipeListComponent', () => {
  let component: CreatedRecipeListComponent;
  let fixture: ComponentFixture<CreatedRecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedRecipeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
