import { Controller, Get, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('opportunity') opportunityId: string,
  ) {
    return this.quoteService.findAll(limit, page, opportunityId);
  }
}
