import { TestBed } from '@angular/core/testing';

import { GraphBuilderService } from './graph-builder.service';

describe('GraphbuilderService', () => {
  let service: GraphBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
