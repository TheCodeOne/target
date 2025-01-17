import { Body, Controller, Post } from '@nestjs/common';
import { QuoteRequestDto, QuoteResponseDto } from '@target/interfaces';
import { InputDtoSchema } from '@target/validations';

import { ValidationPipe } from './pipes/validation.pipe';
import { QuoteService } from './services/quote/quote.service';

@Controller()
export class AppController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('/quote')
  getQuote(@Body(new ValidationPipe(InputDtoSchema)) quoteDto: QuoteRequestDto): Promise<QuoteResponseDto> {
    return this.quoteService.getQuote(quoteDto);
  }
}
