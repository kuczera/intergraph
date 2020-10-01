import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeInformationComponent } from './cytoscape-information.component';

describe('CytoscapeInformationComponent', () => {
  let component: CytoscapeInformationComponent;
  let fixture: ComponentFixture<CytoscapeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytoscapeInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
