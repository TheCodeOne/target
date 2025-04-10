import moment from 'moment/moment';
import { z } from 'zod';

export const geburtsdatumSchema = z.coerce
  .string()
  .min(1, { message: 'Date of birth is required' })
  .refine((val) => {
    if (!val) return true;

    return moment(val).isValid();
  }, 'Please provide a valid date')
  .refine((val) => {
    const date = moment(val);

    if (!date.isValid()) return true;

    return date.isBefore(moment().subtract(18, 'years'));
  }, 'You must be at least 18 years old to proceed');
