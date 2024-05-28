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

  async findAll(limit: number, page: number) {
    const offset = (page - 1) * limit;

    console.log(page, limit, offset);

    // Construir a consulta SOQL dinamicamente
    const soqlQuery = `query?q=SELECT+FIELDS(ALL)+FROM+Opportunity+LIMIT+${limit}+OFFSET+${offset}`;
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
