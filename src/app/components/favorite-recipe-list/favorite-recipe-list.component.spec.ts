import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRecipeListComponent } from './favorite-recipe-list.component';

describe('FavoriteRecipeListComponent', () => {
  let component: FavoriteRecipeListComponent;
  let fixture: ComponentFixture<FavoriteRecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteRecipeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
