import { z } from 'zod';

export const BeitragszahlungsweiseEinmalbeitragSchema = z.literal('Einmalbeitrag');
export const BeitragszahlungsweiseMonatlicheBeiträgeSchema = z.literal('Monatliche Beiträge');

export const BeitragszahlungsweiseSchema = z.enum([BeitragszahlungsweiseEinmalbeitragSchema.value, BeitragszahlungsweiseMonatlicheBeiträgeSchema.value]);
export type Beitragszahlungsweise = z.infer<typeof BeitragszahlungsweiseSchema>;
