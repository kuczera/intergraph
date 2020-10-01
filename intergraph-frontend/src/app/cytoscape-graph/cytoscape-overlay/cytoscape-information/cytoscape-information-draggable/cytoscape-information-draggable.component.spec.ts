import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeInformationDraggableComponent } from './cytoscape-information-draggable.component';

describe('CytoscapeInformationDraggableComponent', () => {
  let component: CytoscapeInformationDraggableComponent;
  let fixture: ComponentFixture<CytoscapeInformationDraggableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytoscapeInformationDraggableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapeInformationDraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
