import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Query,

  // Delete,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
// import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  async findAll(@Query('cpf') cpf: string, @Query('cnpj') cnpj: string) {
    console.log(cpf);

    return this.leadService.findAll(cpf, cnpj);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
  //   return this.leadService.update(+id, updateLeadDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.leadService.remove(+id);
  // }
}
