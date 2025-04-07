import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';
import { of } from 'rxjs';

import { InputLibComponent } from '../../../index';
import { InputStore } from '../store/input.store';
import { Input, InputState } from '../store/input.store.interfaces';
import { QuoteService } from '../store/services/quote.service';

jest.mock('../store/input.store');
jest.mock('../store/services/quote.service');

describe('InputLibComponent', () => {
  let component: InputLibComponent;
  let fixture: ComponentFixture<InputLibComponent>;
  let inputStore: any;
  let _quoteService: QuoteService;

  beforeEach(async () => {
    const mockHttp = {
      post: jest.fn(),
    } as Partial<HttpClient>;
    const mockQuoteService = {
      calculateQuote: jest.fn().mockReturnValue(
        of({
          basisdaten: {
            geburtsdatum: '1990-01-01',
            versicherungsbeginn: '2024-01-01',
            garantieniveau: '90%',
            alterBeiRentenbeginn: 67,
            aufschubdauer: 30,
            beitragszahlungsdauer: 30,
          },
          leistungsmerkmale: {
            garantierteMindestrente: 1000,
            einmaligesGarantiekapital: 100000,
            todesfallleistungAbAltersrentenbezug: 50000,
          },
          beitrag: {
            einmalbeitrag: 50000,
            beitragsdynamik: '3%',
          },
        })
      ),
      http: mockHttp as HttpClient,
    };
    const mockState: InputState = {
      geburtsdatum: { value: '2002-02-04', valid: true, error: null },
      leistungsVorgabe: { value: 'Beitrag', valid: true, error: null },
      beitrag: { value: 1000, valid: true, error: null },
      berechnungDerLaufzeit: {
        value: 'Alter bei Rentenbeginn',
        valid: true,
        error: null,
      },
      laufzeit: { value: 10, valid: true, error: null },
      beitragszahlungsweise: {
        value: 'Einmalbeitrag',
        valid: true,
        error: null,
      },
      rentenzahlungsweise: {
        value: 'Monatliche Renten',
        valid: true,
        error: null,
      },
      // quote: {
      //   basisdaten: {
      //     geburtsdatum: '',
      //     versicherungsbeginn: '',
      //     garantieniveau: '',
      //     alterBeiRentenbeginn: 0,
      //     aufschubdauer: 0,
      //     beitragszahlungsdauer: 0
      //   },
      //   leistungsmerkmale: {
      //     garantierteMindestrente: 0,
      //     einmaligesGarantiekapital: 0,
      //     todesfallleistungAbAltersrentenbezug: 0
      //   },
      //   beitrag: {
      //     einmalbeitrag: 0,
      //     beitragsdynamik: ''
      //   },
      // },
    };

    await TestBed.configureTestingModule({
      imports: [InputLibComponent, NxSpinnerComponent],
      providers: [
        provideHttpClient(),
        { provide: QuoteService, useValue: mockQuoteService },
        {
          provide: InputStore,
          useValue: {
            updateInputs: jest.fn(),
            calculate: jest.fn(),
            uiState: jest.fn(() => mockState),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputLibComponent);
    component = fixture.componentInstance;
    inputStore = TestBed.inject(InputStore);
    _quoteService = TestBed.inject(QuoteService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update inputs through the store', async () => {
    const input: Input = {
      key: 'beitrag',
      value: 2000,
    };

    await component.updateInputs(input);

    expect(inputStore.updateInputs).toHaveBeenCalledWith(input);
  });

  it('should calculate through the store', async () => {
    await component.calculate();
    // TOOO: Fix text with "Could not parse CSS stylesheet" error
    expect(inputStore.calculate).toHaveBeenCalled();
  });

  it('should handle string inputs', async () => {
    const input: Input = {
      key: 'leistungsVorgabe',
      value: 'Rente',
    };

    await component.updateInputs(input);

    expect(inputStore.updateInputs).toHaveBeenCalledWith(input);
  });

  it('should handle numeric inputs', async () => {
    const input: Input = {
      key: 'laufzeit',
      value: 15,
    };

    await component.updateInputs(input);

    expect(inputStore.updateInputs).toHaveBeenCalledWith(input);
  });
});
