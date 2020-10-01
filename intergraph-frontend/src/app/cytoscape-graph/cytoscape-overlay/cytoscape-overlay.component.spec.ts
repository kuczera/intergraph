import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeOverlayComponent } from './cytoscape-overlay.component';

describe('CytoscapeOverlayComponent', () => {
  let component: CytoscapeOverlayComponent;
  let fixture: ComponentFixture<CytoscapeOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytoscapeOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapeOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
