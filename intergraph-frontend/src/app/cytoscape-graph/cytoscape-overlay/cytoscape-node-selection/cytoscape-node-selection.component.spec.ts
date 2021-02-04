import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeNodeSelectionComponent } from './cytoscape-node-selection.component';

describe('CytoscapeNodeSelectionComponent', () => {
  let component: CytoscapeNodeSelectionComponent;
  let fixture: ComponentFixture<CytoscapeNodeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytoscapeNodeSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapeNodeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
