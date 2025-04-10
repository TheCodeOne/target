import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  QuoteCreateResponseDto,
  QuoteRequestDto,
  QuoteResponseDto,
} from '@target/interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly http = inject(HttpClient);

  calculateQuote(
    quoteDto: QuoteRequestDto
  ): Observable<QuoteCreateResponseDto> {
    return this.http.post<QuoteCreateResponseDto>('/api/quote', quoteDto);
  }

  fetchQuote(quoteId: string): Observable<QuoteResponseDto> {
    return this.http.get<QuoteResponseDto>(`/api/quote/${quoteId}`);
  }
}
