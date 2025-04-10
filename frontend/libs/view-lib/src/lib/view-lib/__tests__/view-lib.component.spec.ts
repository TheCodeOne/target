import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStore } from '../store/quote.store';
import { ViewLibComponent } from '../view-lib.component';

describe('ViewLibComponent', () => {
  let component: ViewLibComponent;
  let fixture: ComponentFixture<ViewLibComponent>;

  // @ts-ignore
  let consoleSpy: any;

  const mockQuoteState = {
    basisdaten: {
      geburtsdatum: '2020-01-01',
      versicherungsbeginn: '2025-01-01',
      garantieniveau: '',
      alterBeiRentenbeginn: 0,
      aufschubdauer: 0,
      beitragszahlungsdauer: 0,
    },
    leistungsmerkmale: {
      garantierteMindestrente: 0,
      einmaligesGarantiekapital: 0,
      todesfallleistungAbAltersrentenbezug: 0,
    },
    beitrag: {
      einmalbeitrag: 0,
      beitragsdynamik: '',
    },
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
      imports: [ViewLibComponent],
      providers: [
        {
          provide: QuoteStore,
          useValue: {
            quoteState: jest.fn().mockReturnValue(mockQuoteState),
            fetchQuote: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => consoleSpy.mockRestore());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have state property with QuoteStore data', () => {
    expect(component['state']).toEqual(mockQuoteState);
  });
});
