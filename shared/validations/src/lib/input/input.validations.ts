import { z } from 'zod';

import { BeitragszahlungsweiseSchema } from './beitragszahlungsweise';
import { BerechnungDerLaufzeitSchema } from './berechnung-der-laufzeit';
import { geburtsdatumSchema } from './geburtsdatum';
import { LeistungsvorgabeSchema } from './leistungsvorgabe';
import { RentenzahlungsweiseSchema } from './rentenzahlungsweise';

export const InputDtoSchema = z.object({
  geburtsdatum: geburtsdatumSchema,
  leistungsVorgabe: LeistungsvorgabeSchema.nullish(),
  beitrag: z
    .number()
    .min(500, 'Der Beitrag muss mindestens 500€ betragen')
    .max(100000, 'Der Beitrag darf höchstens 100.000€ betragen'),
  berechnungDerLaufzeit: BerechnungDerLaufzeitSchema.nullish(),
  laufzeit: z
    .number()
    .min(1, 'Die Laufzeit muss mindestens 1 Jahr betragen')
    .max(40, 'Die Laufzeit darf höchstens 40 Jahre betragen'),
  beitragszahlungsweise: BeitragszahlungsweiseSchema.nullish(),
  rentenzahlungsweise: RentenzahlungsweiseSchema.nullish(),
});

export type InputDto = z.infer<typeof InputDtoSchema>;
