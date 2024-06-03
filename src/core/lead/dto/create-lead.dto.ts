import { IsBoolean, IsOptional, IsString } from 'class-validator';

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
  mobilePhone: number;

  @IsString()
  interest: 'NOVOS' | 'SEMINOVOS' | 'CONSORCIO';

  @IsString()
  leadSource: string;

  @IsString()
  dealershipRef: string;

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

  @IsString()
  colabEmail: string;

  @IsString()
  colabFullName: string;
}
