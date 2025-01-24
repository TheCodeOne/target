import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuoteRequestDto, QuoteResponseDto } from '@target/interfaces';
import { InputDtoSchema } from '@target/validations';

import { ValidationPipe } from './pipes/validation.pipe';
import { QuoteService } from './services/quote/quote.service';

@Controller()
export class AppController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('/quote')
  async postQuote(@Body(new ValidationPipe(InputDtoSchema)) quoteDto: QuoteRequestDto): Promise<QuoteResponseDto> {
    return await this.quoteService.requestQuote(quoteDto);
  }

  @Get('/quote')
  async getQuote(@Query('quoteId') quoteId: string): Promise<QuoteResponseDto> {
    return await this.quoteService.getQuote(quoteId);
  }
}
