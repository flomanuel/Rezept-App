import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeDetailPageComponent } from './user-recipe-detail-page.component';

describe('UserRecipeDetailPageComponent', () => {
  let component: UserRecipeDetailPageComponent;
  let fixture: ComponentFixture<UserRecipeDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRecipeDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecipeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
