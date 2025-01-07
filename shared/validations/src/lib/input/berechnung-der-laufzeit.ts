import { z } from 'zod';

export const BerechnungDerLaufzeitAlterBeiRentenbeginnSchema = z.literal('Alter bei Rentenbeginn');
export const BerechnungDerLaufzeitAufschubdauerSchema = z.literal('Aufschubdauer');

export const BerechnungDerLaufzeitSchema = z.enum([BerechnungDerLaufzeitAlterBeiRentenbeginnSchema.value, BerechnungDerLaufzeitAufschubdauerSchema.value]);
export type BerechnungDerLaufzeit = z.infer<typeof BerechnungDerLaufzeitSchema>;
