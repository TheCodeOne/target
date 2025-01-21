import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QuoteRequestDto, QuoteResponseDto } from '@target/interfaces';

@Injectable()
export class QuoteService {
  async getQuote({ beitrag }: QuoteRequestDto): Promise<QuoteResponseDto> {
    const randomSec = Math.random() * 4000;

    await this.sleep(randomSec); // Simulate a real quote service delay 😅

    // Simulate a real quote service internal error appears
    if (randomSec > 2000) {
      throw new InternalServerErrorException();
    }

    return {
      basisdaten: {
        geburtsdatum: '1990-01-01',
        versicherungsbeginn: '2025-02-01',
        garantieniveau: '90%',
        alterBeiRentenbeginn: 67,
        aufschubdauer: 30,
        beitragszahlungsdauer: 10
      },
      leistungsmerkmale: {
        garantierteMindestrente: beitrag * 50,
        einmaligesGarantiekapital: beitrag / 2,
        todesfallleistungAbAltersrentenbezug: 67
      },
      beitrag: {
        einmalbeitrag: beitrag,
        beitragsdynamik: '1,5%'
      }
    };
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
