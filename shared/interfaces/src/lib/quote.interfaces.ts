import { InputDto } from '@target/validations';

export interface QuoteRequestDto extends InputDto {}

export interface QuoteResponseDto {
  id?: string;
  basisdaten: IQuoteBasisdaten;
  leistungsmerkmale: IQuoteLeistungsmerkmale;
  beitrag: IQuoteBeitrag;
}

interface IQuoteBasisdaten {
  geburtsdatum: string;
  versicherungsbeginn: string;
  garantieniveau: string;
  alterBeiRentenbeginn: number;
  aufschubdauer: number;
  beitragszahlungsdauer: number;
}

interface IQuoteLeistungsmerkmale {
  garantierteMindestrente: number;
  einmaligesGarantiekapital: number;
  todesfallleistungAbAltersrentenbezug: number;
}

interface IQuoteBeitrag {
  einmalbeitrag: number;
  beitragsdynamik: string;
}
