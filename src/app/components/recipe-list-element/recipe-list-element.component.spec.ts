import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListElementComponent } from './recipe-list-element.component';

describe('RecipeListElementComponent', () => {
  let component: RecipeListElementComponent;
  let fixture: ComponentFixture<RecipeListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
