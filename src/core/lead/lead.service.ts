import { Injectable } from '@nestjs/common';
// import { UpdateLeadDto } from './dto/update-lead.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import { env } from 'process';
import {
  salesforceApiGetLeads,
  salesforceApiGetOneLead,
} from 'src/resources/apis/salesforce.api';

@Injectable()
export class LeadService {
  create(createLeadDto: CreateLeadDto) {
    console.log(createLeadDto);
    console.log(env.SALESFORCE_CLIENT_ID);
    return 'This action adds a new lead';
  }

  async findAll(page: number, limit: number, cpf: string, cnpj: string) {
    console.log(cpf, cnpj);

    const offset = (page - 1) * limit;

    console.log(page, limit, offset);

    // Construir a consulta SOQL dinamicamente
    const soqlQuery = `query?q=SELECT+FIELDS(ALL)+FROM+Lead+LIMIT+${limit}+OFFSET+${offset}`;

    const leads = await salesforceApiGetLeads(soqlQuery);
    return { page, limit, records: leads };
  }

  findOne(id: string) {
    return salesforceApiGetOneLead(id);
  }

  // update(id: number, updateLeadDto: UpdateLeadDto) {
  //   return `This action updates a #${id} lead`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} lead`;
  // }
}
