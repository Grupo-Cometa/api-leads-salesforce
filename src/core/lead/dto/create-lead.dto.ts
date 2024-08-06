import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export enum LeadInterest {
  NOVOS = 'NOVOS',
  SEMINOVOS = 'SEMINOVOS',
  CONSORCIO = 'CONSORCIO',
  CAPTACAO = 'CAPTACAO DE VEICULOS',
}
export class CreateLeadDto {
  @IsOptional()
  @IsString()
  company: string;

  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  cnpj: string;

  @IsString()
  mobilePhone: string;

  @IsEnum(LeadInterest)
  interest: LeadInterest;

  @IsString()
  leadSource: string;

  @IsString()
  dealershipRef: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsBoolean()
  acceptPrivacyPolicies: boolean;

  @IsBoolean()
  receiveEmailOffers: boolean;

  @IsBoolean()
  receiveSMSOffers: boolean;

  @IsString()
  colabDocument: string;

  @IsOptional()
  @IsString()
  colabEmail: string;

  @IsString()
  colabFullName: string;

  @IsOptional()
  @IsString()
  observations: string;
}
