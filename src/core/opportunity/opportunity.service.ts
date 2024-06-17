import { Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import {
  salesforceApiGetOneOpportunity,
  salesforceApiGetOpportunities,
} from 'src/resources/apis/salesforce.api';

@Injectable()
export class OpportunityService {
  create(createOpportunityDto: CreateOpportunityDto) {
    console.log(createOpportunityDto);

    return 'This action adds a new opportunity';
  }

  async findAll(limit: number, page: number, leadId: string) {
    if (limit > 200) {
      limit = 200;
    }
    const offset = (page - 1) * limit;

    // Construir a consulta SOQL dinamicamente
    let soqlQuery = `query?q=SELECT+FIELDS(ALL)+FROM+Opportunity`;

    // Adicionar condições se os parâmetros cpf e cnpj existirem
    const conditions: string[] = [];
    if (leadId) {
      conditions.push(`Lead_Convertido__c='${leadId}'`);
    }
    // Adicionar condições à consulta, se houver
    if (conditions.length > 0) {
      soqlQuery += `+WHERE+${conditions.join('+AND+')}`;
    }

    // Adicionar limit e offset
    soqlQuery += `+LIMIT+${limit}+OFFSET+${offset}`;
    const opps = await salesforceApiGetOpportunities(soqlQuery);

    return { page, limit, records: opps };
  }

  async findOne(id: string) {
    return salesforceApiGetOneOpportunity(id);
  }

  // update(id: number, updateOpportunityDto: UpdateOpportunityDto) {
  //   return `This action updates a #${id} opportunity`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} opportunity`;
  // }
}
