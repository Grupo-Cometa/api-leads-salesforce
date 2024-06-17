import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { env } from 'process';
import { CreateLeadDto } from 'src/core/lead/dto/create-lead.dto';

export async function salesforceApiLogin() {
  const { data } = await axios.post(
    `https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=${env.SALESFORCE_CLIENT_ID}&client_secret=${env.SALESFORCE_CLIENT_SECRET}&username=${env.SALESFORCE_USERNAME}&password=${env.SALESFORCE_PASSWORD}`,
  );

  return data;
}

export async function salesforceApiCreateLead(leadData: CreateLeadDto) {
  const restOAuth = await salesforceApiLogin();

  const formatToSalesforceLead = {
    Company: leadData.company,
    LastName: leadData.fullName,
    CPF__c: leadData.cpf,
    CNPJ__c: leadData.cnpj,
    MobilePhone: leadData.mobilePhone,
    Interesse_em__c: leadData.interest, //"NOVOS" - SEMINOVOS - CONSORCIO
    LeadSource: leadData.leadSource,
    Concessionaria_Ref__c: leadData.dealershipRef,
    Email: leadData.email,
    Aceite_politicas_de_Privacidade__c: leadData.acceptPrivacyPolicies,
    Receber_ofertas_por_E_mail__c: leadData.receiveEmailOffers,
    Receber_ofertas_por_SMS__c: leadData.receiveSMSOffers,
    CPF_colaborador__c: leadData.colabDocument,
    Email_colaborador__c: leadData.colabEmail,
    Nome_colaborador__c: leadData.colabFullName,
  };

  const { data } = await axios
    .post(
      `${restOAuth.instance_url}/services/data/${env.SALESFORCE_API_VERSION}/sobjects/Lead`,
      formatToSalesforceLead,
      {
        headers: {
          Authorization: `${restOAuth.token_type} ${restOAuth.access_token}`,
        },
      },
    )
    .catch(async (err) => {
      throw new HttpException(
        'Create Salesforce Lead error',
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(err),
        },
      );
    });

  return data;
}

export async function salesforceApiGetLeads(soqlQuery: string) {
  const restOAuth = await salesforceApiLogin();

  const { data } = await axios
    .get(
      `${restOAuth.instance_url}/services/data/${env.SALESFORCE_API_VERSION}/${soqlQuery}`,
      {
        headers: {
          Authorization: `${restOAuth.token_type} ${restOAuth.access_token}`,
        },
      },
    )
    .catch((err) => {
      throw new HttpException('Unable to get Leads.', HttpStatus.BAD_REQUEST, {
        cause: err,
      });
    });

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

  const { data } = await axios
    .get(
      `${restOAuth.instance_url}/services/data/${env.SALESFORCE_API_VERSION}/${soqlQuery}`,
      {
        headers: {
          Authorization: `${restOAuth.token_type} ${restOAuth.access_token}`,
        },
      },
    )
    .catch((err) => {
      throw new HttpException(
        'Unable to get Opportunities.',
        HttpStatus.BAD_REQUEST,
        {
          cause: err,
        },
      );
    });

  const formattedData = data.records.map((data) => {
    return {
      sfId: data.Id,
      fullname: data.Name,
      cpf: data.CPF__c,
      cnpj: data.CNPJ__c,
      stageName: data.StageName,
      invoiced: data.Cotacao_Faturada__c,
      recordTypeId: data.RecordTypeId,
      interest: data.Interesse_em__c,
      leadSource: data.LeadSource,
      createdDate: data.CreatedDate,
      dealership: data.Concessionaria_Ref__c,
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
