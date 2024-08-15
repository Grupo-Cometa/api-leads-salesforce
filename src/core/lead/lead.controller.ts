import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Query,
  ValidationPipe,

  // Delete,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
// import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body(new ValidationPipe()) createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('cpf') cpf: string,
    @Query('cnpj') cnpj: string,
    @Query('lead_source') leadSource: string,
    @Query('dealership_ref') dealershipRef: string,
    @Query('mobile_phone') mobilePhone: string,
    @Query('record_type_id') recordTypeId: string,
    @Query('interest') interest: string,
  ) {
    return this.leadService.findAll(
      page,
      limit,
      cpf,
      cnpj,
      leadSource,
      dealershipRef,
      mobilePhone,
      recordTypeId,
      interest,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(id);
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
