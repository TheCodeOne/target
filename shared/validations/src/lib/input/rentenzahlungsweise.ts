import { NxDropdownOption } from '@aposin/ng-aquila/dropdown';
import { z } from 'zod';

export const RentenzahlungsweiseMonatlichSchema =
  z.literal('Monatliche Renten');
export const RentenzahlungsweiseVierteljaehrlichSchema = z.literal(
  'Vierteljährliche Renten'
);
export const RentenzahlungsweiseHalbjaehrlichSchema = z.literal(
  'Halbjährliche Renten'
);
export const RentenzahlungsweiseJaehrlichSchema = z.literal('Jährliche Renten');

export const RentenzahlungsweiseSchema = z.enum([
  RentenzahlungsweiseMonatlichSchema.value,
  RentenzahlungsweiseVierteljaehrlichSchema.value,
  RentenzahlungsweiseHalbjaehrlichSchema.value,
  RentenzahlungsweiseJaehrlichSchema.value,
]);

export const rentenzahlungsweiseOpts: NxDropdownOption[] = Object.entries(
  RentenzahlungsweiseSchema.enum
).map(([label, value]) => ({
  label,
  value,
}));
