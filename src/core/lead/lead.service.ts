import { HttpException, Injectable } from '@nestjs/common';
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
    if (
      createLeadDto.interest === 'CAPTACAO DE VEICULOS' &&
      !createLeadDto.observations
    ) {
      throw new HttpException(
        'Field "observation" is required for interest type: CAPTACAO DE VEICULOS',
        404,
      );
    }

    if (
      (createLeadDto.cnpj && !createLeadDto.company) ||
      (!createLeadDto.cnpj && createLeadDto.company)
    ) {
      throw new HttpException(
        'Invalid format: creating a lead with cnpj requires the company field',
        404,
      );
    }
    const lead = await salesforceApiCreateLead(createLeadDto);

    return lead;
  }

  async findAll(
    page: number,
    limit: number,
    cpf: string,
    cnpj: string,
    leadSource: string,
    dealershipRef: string,
    mobilePhone: string,
    recordTypeId: string,
    interest: string,
  ) {
    if (limit > 200) {
      limit = 200;
    }
    const offset = (page - 1) * limit;

    //TO DO
    // Validar informações dos parâmetros para não quebrar a consulta no SF

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
    if (dealershipRef) {
      conditions.push(`Concessionaria_Ref__c='${dealershipRef}'`);
    }
    if (mobilePhone) {
      conditions.push(`mobilePhone='${mobilePhone}'`);
    }
    if (recordTypeId) {
      conditions.push(`RecordTypeId='${recordTypeId}'`);
    }
    if (interest) {
      conditions.push(`Interesse_em__c='${interest}'`);
    }

    // Adicionar condições à consulta, se houver
    if (conditions.length > 0) {
      soqlQuery += `+WHERE+${conditions.join('+AND+')}`;
    }

    // Adicionar limit e offset
    soqlQuery += `+ORDER+BY+CreatedDate+DESC+LIMIT+${limit}+OFFSET+${offset}`;
    const leads = await salesforceApiGetLeads(soqlQuery);
    return { page, limit, records: leads };
  }

  findOne(id: string) {
    return salesforceApiGetOneLead(id);
  }
}
