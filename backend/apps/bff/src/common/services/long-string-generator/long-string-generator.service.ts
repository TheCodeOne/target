import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class LongStringGeneratorService {
  generate(size = 10) {
    return randomBytes(size).toString('hex');
  }
}
