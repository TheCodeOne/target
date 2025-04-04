interface InputField<T> {
  value: T;
  valid: boolean;
  error: string | null;
}

export interface InputState {
  geburtsdatum: InputField<string>;
  leistungsVorgabe: InputField<string>;
  beitrag: InputField<number>;
  berechnungDerLaufzeit: InputField<string>;
  laufzeit: InputField<number>;
  beitragszahlungsweise: InputField<string>;
  rentenzahlungsweise: InputField<string>;
}

export interface Input {
  key: keyof InputState;
  value: string | number;
}
