import { Injectable } from '@nestjs/common';
import { salesforceApiGetByQuery } from 'src/resources/apis/salesforce.api';

@Injectable()
export class QuoteService {
  async findAll(limit: number, page: number, QuoteNumber: string) {
    if (limit > 200) {
      limit = 200;
    }
    const offset = (page - 1) * limit;

    // Construir a consulta SOQL dinamicamente
    let soqlQuery = `query?q=SELECT+FIELDS(ALL)+FROM+Quote`;

    // Adicionar condições se os parâmetros cpf e cnpj existirem
    const conditions: string[] = [];
    if (QuoteNumber) {
      conditions.push(`QuoteNumber='${QuoteNumber}'`);
    }
    // Adicionar condições à consulta, se houver
    if (conditions.length > 0) {
      soqlQuery += `+WHERE+${conditions.join('+AND+')}`;
    }

    // Adicionar limit e offset
    soqlQuery += `+LIMIT+${limit}+OFFSET+${offset}`;
    const opps = await salesforceApiGetByQuery(soqlQuery);

    return { page, limit, records: opps };
  }
}
