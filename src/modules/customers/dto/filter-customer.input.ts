import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CustomerFilter {
  @Field(() => String, { nullable: true, description: 'Filter customers by full or partial name' })
  @IsOptional()
  @IsString()
  customerName_contains?: string;

  @Field(() => String, { nullable: true, description: 'Filter by European Union VAT Number' })
  @IsOptional()
  @IsString()
  vatNumber_equals?: string;

  @Field(() => String, { nullable: true, description: 'Filter by Co. Reg. Number' })
  @IsOptional()
  @IsString()
  companyRegistrationNumber_equals?: string;

  @Field(() => String, { nullable: true, description: 'Filter by language (e.g., "BRI", "POR")' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value?.toUpperCase() : value))
  language_equals?: string;

  @Field(() => String, { nullable: true, description: 'Filter by currency code (e.g., "EUR", "USD")' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value?.toUpperCase() : value))
  currency_equals?: string;

  @Field(() => String, { nullable: true, description: 'Filter by country code (e.g., "PT"' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value?.toUpperCase() : value))
  country_equals?: string;

  @Field(() => String, { nullable: true, description: 'Search term for the country name' })
  @IsOptional()
  @IsString()
  countryName_contains?: string;

  @Field(() => String, { nullable: true, description: 'Filter by city' })
  @IsOptional()
  @IsString()
  city_equals?: string;

  @Field(() => String, { nullable: true, description: 'Search term form the postal code' })
  @IsOptional()
  @IsString()
  postalCode_contains?: string;
}
