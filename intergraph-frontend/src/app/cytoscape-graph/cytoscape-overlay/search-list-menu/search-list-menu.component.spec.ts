import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListMenuComponent } from './search-list-menu.component';

describe('SearchListMenuComponent', () => {
  let component: SearchListMenuComponent;
  let fixture: ComponentFixture<SearchListMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchListMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
