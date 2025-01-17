import { QuoteResponseDto } from "@target/interfaces";

interface InputField<T> {
  value: T;
  valid: boolean;
  error: string | null;
}

export enum InputStatePropertiesEnum {
  LeistungsVorgabe = 'leistungsVorgabe',
  Beitrag = 'beitrag',
  BerechnungDerLaufzeit = 'berechnungDerLaufzeit',
  Laufzeit = 'laufzeit',
  Beitragszahlungsweise = 'beitragszahlungsweise',
  Rentenzahlungsweise = 'rentenzahlungsweise',
  Geburtstag = 'geburtstag',
}

export interface InputState {
  [InputStatePropertiesEnum.LeistungsVorgabe]: InputField<string>;
  [InputStatePropertiesEnum.Beitrag]: InputField<number>;
  [InputStatePropertiesEnum.BerechnungDerLaufzeit]: InputField<string>;
  [InputStatePropertiesEnum.Laufzeit]: InputField<number>;
  [InputStatePropertiesEnum.Beitragszahlungsweise]: InputField<string>;
  [InputStatePropertiesEnum.Rentenzahlungsweise]: InputField<string>;
  [InputStatePropertiesEnum.Geburtstag]: InputField<Date | null>;
};

export interface UiState extends InputState {
  quote: QuoteResponseDto;
}

export interface Input {
  key: keyof UiState;
  value: string | number | Date;
}
