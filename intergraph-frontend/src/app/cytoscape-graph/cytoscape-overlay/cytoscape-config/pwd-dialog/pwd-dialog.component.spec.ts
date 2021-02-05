import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdDialogComponent } from './pwd-dialog.component';

describe('CytoscapeConfigComponent', () => {
  let component: PwdDialogComponent;
  let fixture: ComponentFixture<PwdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwdDialogComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
