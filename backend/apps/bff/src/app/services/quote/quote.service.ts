import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QuoteRequestDto, QuoteResponseDto } from '@target/interfaces';
import { createHash } from 'crypto';

@Injectable()
export class QuoteService {
  // Mocking data base storage
  private readonly dataBase = new Map<string, QuoteResponseDto>();

  async requestQuote(payload: QuoteRequestDto): Promise<QuoteResponseDto> {
    const randomSec = Math.random() * 4000;

    await this.sleep(randomSec);
    if (randomSec > 3500) {
      throw new InternalServerErrorException();
    }
    const quoteKey = this.generateKey(payload);

    try {
      return this.tryGetQuoteFromDatabase(quoteKey);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.createQuote(payload);
        return this.dataBase.get(quoteKey);
      } else {
        throw error;
      }
    }
  }

  async getQuote(quoteKey: string): Promise<QuoteResponseDto> {
    const randomSec = Math.random() * 2000;

    await this.sleep(randomSec); // Simulate a real quote service delay 😅

    return this.tryGetQuoteFromDatabase(quoteKey);
  }

  private generateKey(payload: Record<string, any>): string {
    const sortedPayload = Object.keys(payload)
      .sort()
      .reduce((result, key) => {
        result[key] = payload[key];
        return result;
      }, {} as Record<string, any>);
    const payloadString = JSON.stringify(sortedPayload);

    return createHash('sha256').update(payloadString).digest('hex');
  }

  private tryGetQuoteFromDatabase(quoteKey: string): QuoteResponseDto {
    if (this.dataBase.has(quoteKey)) {
      return this.dataBase.get(quoteKey);
    }

    throw new NotFoundException();
  }

  private createQuote(payload: QuoteRequestDto): void {
    const key = this.generateKey(payload);
    const responseObject: QuoteResponseDto = {
      basisdaten: {
        geburtsdatum: '1990-01-01',
        versicherungsbeginn: '2025-02-01',
        garantieniveau: '90%',
        alterBeiRentenbeginn: 67,
        aufschubdauer: 30,
        beitragszahlungsdauer: 10,
      },
      leistungsmerkmale: {
        garantierteMindestrente: payload.beitrag * 50,
        einmaligesGarantiekapital: payload.beitrag / 2,
        todesfallleistungAbAltersrentenbezug: 67,
      },
      beitrag: {
        einmalbeitrag: payload.beitrag,
        beitragsdynamik: '1,5%',
      },
      id: key
    };

    this.dataBase.set(key, responseObject);
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
