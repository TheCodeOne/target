import { QuoteResponseDto } from "@target/interfaces";

interface InputField<T> {
  value: T;
  valid: boolean;
  error: string | null;
}

export interface InputState {
  leistungsVorgabe: InputField<string>;
  beitrag: InputField<number>;
  berechnungDerLaufzeit: InputField<string>;
  laufzeit: InputField<number>;
  beitragszahlungsweise: InputField<string>;
  rentenzahlungsweise: InputField<string>;
  quote: QuoteResponseDto;
}

export interface Input {
  key: keyof InputState;
  value: string | number;
}
