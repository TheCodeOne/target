import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QuoteResponseDto } from '@target/interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly http = inject(HttpClient);

  getQuote(quoteId: string): Observable<QuoteResponseDto> {
    return this.http.get<QuoteResponseDto>('/api/quote', { params: { quoteId }});
  }
}
