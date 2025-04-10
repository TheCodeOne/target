import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { InputStore } from '@target/input-store-lib';
import { QuoteService } from '@target/service-lib';

import { InputLibComponent } from '../../../index';

describe('InputLibComponent', () => {
  let component: InputLibComponent;
  let fixture: ComponentFixture<InputLibComponent>;

  // @ts-ignore
  let consoleSpy: any;

  const mockInputStore = {
    uiState: jest.fn().mockReturnValue({
      geburtsdatum: { value: '' },
      leistungsVorgabe: { value: '' },
      beitrag: { value: '' },
      berechnungDerLaufzeit: { value: '' },
      laufzeit: { value: '' },
      beitragszahlungsweise: { value: '' },
      rentenzahlungsweise: { value: '' },
    }),
    updateInputs: jest.fn().mockResolvedValue(undefined),
    calculate: jest.fn().mockResolvedValue('1234'),
    processErrors: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    // Prevent 'Could not parse CSS stylesheet' exception from running the test. Apparently a bug with nx-spinner css library
    consoleSpy = jest
      .spyOn(global.console, 'error')
      .mockImplementation((message) => {
        if (!message.toString().includes('Could not parse CSS stylesheet')) {
          global.console.warn(message);
        }
      });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, InputLibComponent],
      providers: [
        provideHttpClient(),
        {
          provide: QuoteService,
          useValue: { calculateQuote: jest.fn(), fetchQuote: jest.fn() },
        },
        {
          provide: InputStore,
          useValue: mockInputStore,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputLibComponent);
    component = fixture.componentInstance;
  });

  afterAll(() => consoleSpy.mockRestore());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate through the store', () => {
    component.calculate();

    expect(mockInputStore.calculate).toHaveBeenCalled();
  });
});
