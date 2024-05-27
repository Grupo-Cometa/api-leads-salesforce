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

  const { data } = await axios.get(
    `${restOAuth.instance_url}/services/data/v49.0/sobjects/Lead${soqlQuery}`,
    {
      headers: {
        Authorization: `${restOAuth.token_type} ${restOAuth.access_token}`,
      },
    },
  );

  return data;
}

export async function salesforceApiGetOneLead(leadId: string) {
  const restOAuth = await salesforceApiLogin();

  const { data } = await axios.get(
    `${restOAuth.instance_url}/services/data/v49.0/sobjects/Lead/${leadId}`,
    {
      headers: {
        Authorization: `${restOAuth.token_type} ${restOAuth.access_token}`,
      },
    },
  );

  return data;
}

export async function salesforceApiGetOpportunities() {}

export async function salesforceApiGetOneOpportunity() {}
