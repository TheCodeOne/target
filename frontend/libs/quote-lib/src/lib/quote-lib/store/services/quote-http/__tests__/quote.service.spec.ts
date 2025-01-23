import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { QuoteResponseDto } from '@target/interfaces';
import { firstValueFrom, of, throwError } from 'rxjs';

import { QuoteService } from '../quote.service';

describe('QuoteService', () => {
  let service: QuoteService;
  let httpClient: { get: jest.Mock };

  beforeEach(() => {
    httpClient = { get: jest.fn() };
    TestBed.configureTestingModule({
      providers: [
        QuoteService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
    service = TestBed.inject(QuoteService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  describe('calculateQuote', () => {
    it('should call the correct endpoint with quote id query param', async () => {
      const mockRequestId = 'mockTestId';
      const mockResponse: QuoteResponseDto = {
        basisdaten: {
          geburtsdatum: '1990-01-01',
          versicherungsbeginn: '2024-01-01',
          garantieniveau: '90%',
          alterBeiRentenbeginn: 67,
          aufschubdauer: 30,
          beitragszahlungsdauer: 10
        },
        leistungsmerkmale: {
          garantierteMindestrente: 50000,
          einmaligesGarantiekapital: 25000,
          todesfallleistungAbAltersrentenbezug: 40000
        },
        beitrag: {
          einmalbeitrag: 0,
          beitragsdynamik: '1,5%'
        },
        id: ''
      };

      httpClient.get.mockReturnValue(of(mockResponse));

      const response = await firstValueFrom(service.getQuote(mockRequestId));

      expect(response).toEqual(mockResponse);
      expect(httpClient.get).toHaveBeenCalledWith('/api/quote', { params: { quoteId: mockRequestId }});
    });

    it('should propagate errors from the API', async () => {
      const mockRequestId = 'mockTestId';
      const errorResponse = new Error('API Error');

      httpClient.get.mockReturnValue(throwError(() => errorResponse));

      await expect(firstValueFrom(service.getQuote(mockRequestId)))
        .rejects.toBe(errorResponse);
      expect(httpClient.get).toHaveBeenCalledWith('/api/quote', { params: { quoteId: mockRequestId }});
    });
  });
});

