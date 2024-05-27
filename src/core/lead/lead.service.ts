import { Injectable } from '@nestjs/common';
// import { UpdateLeadDto } from './dto/update-lead.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import { env } from 'process';
import { salesforceApiGetLeads } from 'src/resources/apis/salesforce.api';

@Injectable()
export class LeadService {
  create(createLeadDto: CreateLeadDto) {
    console.log(createLeadDto);
    console.log(env.SALESFORCE_CLIENT_ID);
    return 'This action adds a new lead';
  }

  async findAll(cpf: string, cnpj: string) {
    const soqlQuery = `${cpf} ${cnpj}`;
    return salesforceApiGetLeads(soqlQuery);
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  // update(id: number, updateLeadDto: UpdateLeadDto) {
  //   return `This action updates a #${id} lead`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} lead`;
  // }
}
