import { Injectable } from '@nestjs/common';
import { QuoteRequestDto, QuoteResponseDto } from '@target/interfaces';

@Injectable()
export class QuoteService {
  async getQuote({
    beitrag,
    geburtsdatum,
  }: QuoteRequestDto): Promise<QuoteResponseDto> {
    await this.sleep(Math.random() * 4000); // Simulate a real quote service delay 😅

    return {
      basisdaten: {
        geburtsdatum: geburtsdatum,
        versicherungsbeginn: '2025-02-01',
        garantieniveau: '90%',
        alterBeiRentenbeginn: 67,
        aufschubdauer: 30,
        beitragszahlungsdauer: 10,
      },
      leistungsmerkmale: {
        garantierteMindestrente: beitrag * 50,
        einmaligesGarantiekapital: beitrag / 2,
        todesfallleistungAbAltersrentenbezug: 67,
      },
      beitrag: {
        einmalbeitrag: beitrag,
        beitragsdynamik: '1,5%',
      },
    };
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
