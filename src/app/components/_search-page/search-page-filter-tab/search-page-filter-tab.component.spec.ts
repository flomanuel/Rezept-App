import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageFilterTabComponent } from './search-page-filter-tab.component';

describe('SearchPageFilterTabComponent', () => {
  let component: SearchPageFilterTabComponent;
  let fixture: ComponentFixture<SearchPageFilterTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPageFilterTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageFilterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
