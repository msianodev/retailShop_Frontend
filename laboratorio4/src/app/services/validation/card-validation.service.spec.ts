import { TestBed } from '@angular/core/testing';

import { CardValidationService } from './card-validation.service';

describe('CardValidationService', () => {
  let service: CardValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
