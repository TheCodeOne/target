import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { QuoteRequestDto, QuoteResponseDto } from '@target/interfaces';
import { firstValueFrom, of, throwError } from 'rxjs';

import { QuoteService } from '../quote.service';

describe('QuoteService', () => {
  let service: QuoteService;
  let httpClient: { post: jest.Mock };

  beforeEach(() => {
    httpClient = { post: jest.fn() };
    TestBed.configureTestingModule({
      providers: [QuoteService, { provide: HttpClient, useValue: httpClient }],
    });
    service = TestBed.inject(QuoteService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  describe('calculateQuote', () => {
    it('should call the correct endpoint with quote request data', async () => {
      const geburtsdatum = '2000-01-01';

      const mockRequest: QuoteRequestDto = {
        geburtsdatum,
        beitrag: 1000,
        laufzeit: 12,
        leistungsVorgabe: 'Beitrag',
        berechnungDerLaufzeit: 'Alter bei Rentenbeginn',
        beitragszahlungsweise: 'Monatliche Beiträge',
      };

      const mockResponse: QuoteResponseDto = {
        basisdaten: {
          geburtsdatum: '1990-01-01',
          versicherungsbeginn: '2024-01-01',
          garantieniveau: '90%',
          alterBeiRentenbeginn: 67,
          aufschubdauer: 30,
          beitragszahlungsdauer: 10,
        },
        leistungsmerkmale: {
          garantierteMindestrente: 50000,
          einmaligesGarantiekapital: 25000,
          todesfallleistungAbAltersrentenbezug: 40000,
        },
        beitrag: {
          einmalbeitrag: 0,
          beitragsdynamik: '1,5%',
        },
      };

      httpClient.post.mockReturnValue(of(mockResponse));

      const response = await firstValueFrom(
        service.calculateQuote(mockRequest)
      );

      expect(response).toEqual(mockResponse);
      expect(httpClient.post).toHaveBeenCalledWith('/api/quote', mockRequest);
    });

    it('should propagate errors from the API', async () => {
      const geburtsdatum = '2000-01-01';

      const mockRequest: QuoteRequestDto = {
        geburtsdatum,
        beitrag: 1000,
        laufzeit: 12,
        leistungsVorgabe: 'Beitrag',
        berechnungDerLaufzeit: 'Alter bei Rentenbeginn',
        beitragszahlungsweise: 'Monatliche Beiträge',
      };
      const errorResponse = new Error('API Error');

      httpClient.post.mockReturnValue(throwError(() => errorResponse));

      await expect(
        firstValueFrom(service.calculateQuote(mockRequest))
      ).rejects.toBe(errorResponse);
      expect(httpClient.post).toHaveBeenCalledWith('/api/quote', mockRequest);
    });
  });
});
