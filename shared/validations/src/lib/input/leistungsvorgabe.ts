import { NxDropdownOption } from '@aposin/ng-aquila/dropdown';
import { z } from 'zod';

export const LeistungsvorgabeBeitragSchema = z.literal('Beitrag');
export const LeistungsvorgabeEinmalbeitragSchema = z.literal('Einmalbeitrag');
export const LeistungsvorgabeGarantierteMindestrenteSchema = z.literal(
  'Garantierte Mindestrente'
);
export const LeistungsvorgabeGarantiekapitalSchema =
  z.literal('Garantiekapital');
export const LeistungsvorgabeGesamtkapitalSchema = z.literal('Gesamtkapital');
export const LeistungsvorgabeGesamtrenteSchema = z.literal('Gesamtrente');

export const LeistungsvorgabeSchema = z.enum([
  LeistungsvorgabeBeitragSchema.value,
  LeistungsvorgabeEinmalbeitragSchema.value,
  LeistungsvorgabeGarantierteMindestrenteSchema.value,
  LeistungsvorgabeGarantiekapitalSchema.value,
  LeistungsvorgabeGesamtkapitalSchema.value,
  LeistungsvorgabeGesamtrenteSchema.value,
]);
export type Leistungsvorgabe = z.infer<typeof LeistungsvorgabeSchema>;

export const leistungsVorgabeOpts: NxDropdownOption[] = Object.entries(
  LeistungsvorgabeSchema.enum
).map(([label, value]) => ({
  label,
  value,
}));
