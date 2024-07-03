import { Injectable } from '@nestjs/common';
import { salesforceApiGetByQuery } from 'src/resources/apis/salesforce.api';

@Injectable()
export class QuoteService {
  async findAll(
    limit: number,
    page: number,
    oppId: string,
    quoteNumber: string,
  ) {
    if (limit > 200) {
      limit = 200;
    }
    const offset = (page - 1) * limit;

    // Construir a consulta SOQL dinamicamente
    let soqlQuery = `query?q=SELECT+FIELDS(ALL)+FROM+Quote`;

    // Adicionar condições se os parâmetros cpf e cnpj existirem
    const conditions: string[] = [];
    if (quoteNumber) {
      conditions.push(`QuoteNumber='${quoteNumber}'`);
    }
    if (oppId) {
      conditions.push(`OpportunityId='${oppId}'`);
    }
    // Adicionar condições à consulta, se houver
    if (conditions.length > 0) {
      soqlQuery += `+WHERE+${conditions.join('+AND+')}`;
    }

    // Adicionar limit e offset
    soqlQuery += `+LIMIT+${limit}+OFFSET+${offset}`;
    const quotes = await salesforceApiGetByQuery(soqlQuery);

    const formattedQuotes = quotes.map((quote) => {
      return {
        id: quote.Id,
        ownerId: quote.OwnerId,
        isDeleted: quote.IsDeleted,
        name: quote.Name,
        quoteNumber: quote.QuoteNumber,
        opportunityId: quote.OpportunityId,
      };
    });

    return { page, limit, records: formattedQuotes };
  }
}
