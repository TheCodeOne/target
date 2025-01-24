import { z } from 'zod';

import { BeitragszahlungsweiseSchema } from './beitragszahlungsweise';
import { BerechnungDerLaufzeitSchema } from './berechnung-der-laufzeit';
import { LeistungsvorgabeSchema } from './leistungsvorgabe';
import { RentenzahlungsweiseSchema } from './rentenzahlungsweise';

export const InputDtoSchema = z.object({
  leistungsVorgabe: LeistungsvorgabeSchema.nullish(),
  beitrag: z
    .number()
    .min(500, 'Der Beitrag muss mindestens 500€ betragen')
    .max(100000, 'Der Beitrag darf höchstens 100.000€ betragen'),
  berechnungDerLaufzeit: BerechnungDerLaufzeitSchema.nullish(),
  laufzeit: z
    .number()
    .min(1, 'Die Laufzeit muss mindestens 1 Jahr betragen')
    .max(100, 'Die Laufzeit darf höchstens 40 Jahre betragen'),
  beitragszahlungsweise: BeitragszahlungsweiseSchema.nullish(),
  rentenzahlungsweise: RentenzahlungsweiseSchema.nullish(),
  geburtstag: z
  .preprocess(
    (input) => {
      if (typeof input === 'string' || input instanceof Date) {
        const parsedDate = new Date(input);

        return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
      }
      return undefined;
    },
    z.date().refine((date) => {
      const now = new Date();
      const ageYears = now.getFullYear() - date.getFullYear();    
      const isOlderThan18 =
        ageYears > 18 ||
        (ageYears === 18 &&
          (now.getMonth() > date.getMonth() ||
            (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate())));

      return isOlderThan18;
    }, 'Geburtstag muss mindestens 18 Jahre in der Vergangenheit liegen')
  )
});

export type InputDto = z.infer<typeof InputDtoSchema>;
