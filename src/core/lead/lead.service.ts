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
    const lead = await salesforceApiCreateLead(createLeadDto);

    return lead;
  }

  async findAll(
    page: number,
    limit: number,
    cpf: string,
    cnpj: string,
    leadSource: string,
  ) {
    const offset = (page - 1) * limit;

    // Construir a consulta SOQL dinamicamente
    // Construir a consulta SOQL dinamicamente
    let soqlQuery = `query?q=SELECT+FIELDS(ALL)+FROM+Lead`;

    // Adicionar condições se os parâmetros cpf e cnpj existirem
    const conditions: string[] = [];
    if (cpf) {
      conditions.push(`CPF__c='${cpf}'`);
    }
    if (cnpj) {
      conditions.push(`CNPJ__c='${cnpj}'`);
    }
    if (leadSource) {
      conditions.push(`LeadSource='${leadSource}'`);
    }

    // Adicionar condições à consulta, se houver
    if (conditions.length > 0) {
      soqlQuery += `+WHERE+${conditions.join('+AND+')}`;
    }

    // Adicionar limit e offset
    soqlQuery += `+LIMIT+${limit}+OFFSET+${offset}`;
    const leads = await salesforceApiGetLeads(soqlQuery);
    return { page, limit, records: leads };
  }

  findOne(id: string) {
    return salesforceApiGetOneLead(id);
  }
}
