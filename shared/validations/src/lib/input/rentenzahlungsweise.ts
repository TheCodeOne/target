import { z } from 'zod';

export const RentenzahlungsweiseMonatlichSchema = z.literal('Monatliche Renten');
export const RentenzahlungsweiseVierteljaehrlichSchema = z.literal('Vierteljährliche Renten');
export const RentenzahlungsweiseHalbjaehrlichSchema = z.literal('Halbjährliche Renten');
export const RentenzahlungsweiseJaehrlichSchema = z.literal('Jährliche Renten');

export const RentenzahlungsweiseSchema = z.union([RentenzahlungsweiseMonatlichSchema, RentenzahlungsweiseVierteljaehrlichSchema, RentenzahlungsweiseHalbjaehrlichSchema, RentenzahlungsweiseJaehrlichSchema]);
export type Rentenzahlungsweise = z.infer<typeof RentenzahlungsweiseSchema>;
