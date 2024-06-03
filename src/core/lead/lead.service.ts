import { Injectable } from '@nestjs/common';
// import { UpdateLeadDto } from './dto/update-lead.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import {
  salesforceApiCreateLead,
  salesforceApiGetLeads,
  salesforceApiGetOneLead,
} from 'src/resources/apis/salesforce.api';

@Injectable()
export class LeadService {
  async create(createLeadDto: CreateLeadDto) {
    console.log(createLeadDto);
    const lead = await salesforceApiCreateLead(createLeadDto);
    return lead;
  }

  async findAll(page: number, limit: number, cpf: string, cnpj: string) {
    const offset = (page - 1) * limit;
    console.log(cpf, cnpj);

    // Construir a consulta SOQL dinamicamente
    const soqlQuery = `query?q=SELECT+FIELDS(ALL)+FROM+Lead+LIMIT+${limit}+OFFSET+${offset}`;

    const leads = await salesforceApiGetLeads(soqlQuery);
    return { page, limit, records: leads };
  }

  findOne(id: string) {
    return salesforceApiGetOneLead(id);
  }
}
