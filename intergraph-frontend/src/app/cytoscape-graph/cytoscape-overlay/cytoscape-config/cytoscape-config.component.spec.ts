import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeConfigComponent } from './cytoscape-config.component';

describe('CytoscapeConfigComponent', () => {
  let component: CytoscapeConfigComponent;
  let fixture: ComponentFixture<CytoscapeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytoscapeConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
