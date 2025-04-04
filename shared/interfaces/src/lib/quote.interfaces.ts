import { InputDto } from '@target/validations';

export interface QuoteRequestDto extends InputDto {}

export interface QuoteResponseDto {
  basisdaten: QuoteBasisdatenDto;
  leistungsmerkmale: QuoteLeistungsmerkmaleDto;
  beitrag: QuoteBeitragDto;
}

export interface QuoteCreateResponseDto {
  id: string;
}

interface QuoteBasisdatenDto {
  geburtsdatum: string;
  versicherungsbeginn: string;
  garantieniveau: string;
  alterBeiRentenbeginn: number;
  aufschubdauer: number;
  beitragszahlungsdauer: number;
}

interface QuoteLeistungsmerkmaleDto {
  garantierteMindestrente: number;
  einmaligesGarantiekapital: number;
  todesfallleistungAbAltersrentenbezug: number;
}

interface QuoteBeitragDto {
  einmalbeitrag: number;
  beitragsdynamik: string;
}
