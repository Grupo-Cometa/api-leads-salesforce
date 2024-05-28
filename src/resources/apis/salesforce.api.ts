import axios from 'axios';
import { env } from 'process';

export async function salesforceApiLogin() {
  const { data } = await axios.post(
    `https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=${env.SALESFORCE_CLIENT_ID}&client_secret=${env.SALESFORCE_CLIENT_SECRET}&username=${env.SALESFORCE_USERNAME}&password=${env.SALESFORCE_PASSWORD}`,
  );

  return data;
}

export async function salesforceApiGetLeads(soqlQuery: string) {
  const restOAuth = await salesforceApiLogin();
  console.log(soqlQuery);

  const { data } = await axios.get(
    `${restOAuth.instance_url}/services/data/${env.SALESFORCE_API_VERSION}/${soqlQuery}`,
    {
      headers: {
        Authorization: `${restOAuth.token_type} ${restOAuth.access_token}`,
      },
    },
  );

  const formattedData = data.records.map((data) => {
    return {
      sfId: data.Id,
      fullname: data.Name,
      cpf: data.CPF__c,
      company: data.Company,
      cnpj: data.CNPJ__c,
      interest: data.Interesse_em__c,
      leadSource: data.LeadSource,
      status: data.Status,
      sellerLead: data.VendedorLead__c,
      createdDate: data.CreatedDate,
      dealership: data.Concessionaria_Ref__c,
    };
  });
  return formattedData;
}

export async function salesforceApiGetOneLead(leadId: string) {
  const restOAuth = await salesforceApiLogin();

  const { data } = await axios.get(
    `${restOAuth.instance_url}/services/data/${env.SALESFORCE_API_VERSION}/sobjects/Lead/${leadId}`,
    {
      headers: {
        Authorization: `${restOAuth.token_type} ${restOAuth.access_token}`,
      },
    },
  );

  return {
    sfId: data.Id,
    fullname: data.Name,
    cpf: data.CPF__c,
    company: data.Company,
    cnpj: data.CNPJ__c,
    interest: data.Interesse_em__c,
    leadSource: data.LeadSource,
    status: data.Status,
    sellerLead: data.VendedorLead__c,
    createdDate: data.CreatedDate,
    dealership: data.Concessionaria_Ref__c,
  };
}

export async function salesforceApiGetOpportunities(soqlQuery: string) {
  const restOAuth = await salesforceApiLogin();

  const { data } = await axios.get(
    `${restOAuth.instance_url}/services/data/${env.SALESFORCE_API_VERSION}/${soqlQuery}`,
    {
      headers: {
        Authorization: `${restOAuth.token_type} ${restOAuth.access_token}`,
      },
    },
  );

  const formattedData = data.records.map((data) => {
    return {
      sfId: data.Id,
      fullname: data.Name,
      cpf: data.CPF__c,
      cnpj: data.CNPJ__c,
      interest: data.Interesse_em__c,
      leadSource: data.LeadSource,
      createdDate: data.CreatedDate,
      dealership: data.Concessionaria_Ref__c,
      stageName: data.StageName,
      ownerNameMKT: data.NomeProprietarioMKT__c,
    };
  });
  return formattedData;
}

export async function salesforceApiGetOneOpportunity(oppId: string) {
  const restOAuth = await salesforceApiLogin();

  const { data } = await axios.get(
    `${restOAuth.instance_url}/services/data/${env.SALESFORCE_API_VERSION}/sobjects/Opportunity/${oppId}`,
    {
      headers: {
        Authorization: `${restOAuth.token_type} ${restOAuth.access_token}`,
      },
    },
  );

  return {
    sfId: data.Id,
    fullname: data.Name,
    cpf: data.CPF__c,
    cnpj: data.CNPJ__c,
    interest: data.Interesse_em__c,
    leadSource: data.LeadSource,
    createdDate: data.CreatedDate,
    dealership: data.Concessionaria_Ref__c,
    stageName: data.StageName,
    ownerNameMKT: data.NomeProprietarioMKT__c,
  };
}
