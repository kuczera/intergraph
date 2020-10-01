import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeNodeDetailComponent } from './cytoscape-node-detail.component';

describe('CytoscapeNodeDetailComponent', () => {
  let component: CytoscapeNodeDetailComponent;
  let fixture: ComponentFixture<CytoscapeNodeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytoscapeNodeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapeNodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
