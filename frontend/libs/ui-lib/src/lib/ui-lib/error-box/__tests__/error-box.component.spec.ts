import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorBoxComponent } from '../../../../index';

describe('ErrorBoxComponent', () => {
  let component: ErrorBoxComponent;
  let fixture: ComponentFixture<ErrorBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set simple server error message correctly', () => {
    const error = { statusCode: 500, message: 'An error occurred' };
    const expected = { statusCode: 500, message: ['An error occurred'] };

    component.errorMessage = error;

    expect(component['apiErrorMessage']()).toEqual(expected);
  });

  it('should set composed server error message correctly', () => {
    const error = {
      statusCode: 500,
      message: ['field1: error 1', 'field2: error 2'],
    };
    const expected = {
      statusCode: 500,
      message: ['field1: error 1', 'field2: error 2'],
    };

    component.errorMessage = error;

    expect(component['apiErrorMessage']()).toEqual(expected);
  });
});
