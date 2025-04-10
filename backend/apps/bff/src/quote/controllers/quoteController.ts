import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuoteRequestDto, QuoteResponseDto } from '@target/interfaces';
import { InputDtoSchema } from '@target/validations';

import { QuoteSchema } from '../data/schema/quote.schema';
import { ValidationPipe } from '../pipes/validation.pipe';
import { QuoteService } from '../services/quote/quote.service';

@Controller('/quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async post(
    @Body(new ValidationPipe(InputDtoSchema)) quoteDto: QuoteRequestDto
  ): Promise<QuoteResponseDto> {
    const quote = this.quoteService.calculateQuote({
      beitrag: quoteDto.beitrag,
      geburtsdatum: quoteDto.geburtsdatum,
    });

    return await this.quoteService.createQuote(quote);
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<QuoteSchema> {
    return await this.quoteService.findOnById(id);
  }
}
