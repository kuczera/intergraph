import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeSearchComponent } from './cytoscape-search.component';

describe('CytoscapeSearchComponent', () => {
  let component: CytoscapeSearchComponent;
  let fixture: ComponentFixture<CytoscapeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytoscapeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
