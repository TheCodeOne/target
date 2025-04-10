import { NxDropdownOption } from '@aposin/ng-aquila/dropdown';
import { z } from 'zod';

export const BerechnungDerLaufzeitAlterBeiRentenbeginnSchema = z.literal(
  'Alter bei Rentenbeginn'
);
export const BerechnungDerLaufzeitAufschubdauerSchema =
  z.literal('Aufschubdauer');

export const BerechnungDerLaufzeitSchema = z.enum([
  BerechnungDerLaufzeitAlterBeiRentenbeginnSchema.value,
  BerechnungDerLaufzeitAufschubdauerSchema.value,
]);

export const berechnungDerLaufzeitOpts: NxDropdownOption[] = Object.entries(
  BerechnungDerLaufzeitSchema.enum
).map(([label, value]) => ({
  label,
  value,
}));
