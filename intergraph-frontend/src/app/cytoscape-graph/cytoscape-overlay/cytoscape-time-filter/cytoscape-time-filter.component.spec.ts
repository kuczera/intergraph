import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeTimeFilterComponent } from './cytoscape-time-filter.component';

describe('CytoscapeTimeFilterComponent', () => {
  let component: CytoscapeTimeFilterComponent;
  let fixture: ComponentFixture<CytoscapeTimeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytoscapeTimeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapeTimeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
