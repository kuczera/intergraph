import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeContextMenuComponent } from './cytoscape-context-menu.component';

describe('CytoscapeContextMenuComponent', () => {
  let component: CytoscapeContextMenuComponent;
  let fixture: ComponentFixture<CytoscapeContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytoscapeContextMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapeContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
