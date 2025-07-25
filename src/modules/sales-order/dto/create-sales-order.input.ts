import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { GraphQLDate } from 'graphql-scalars';
import { DimensionInput } from './dimension.input';

@InputType()
export class CreateSalesOrderLineInput {
  @Field(() => String, { description: 'Product SKU' })
  @IsNotEmpty()
  product: string;

  @Field(() => Float, { description: 'Quantity of the product in sales unit' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @Field(() => Float, { nullable: true, description: 'Unit price of the product' })
  @IsNumber()
  grossPrice?: number;

  @Field(() => String, { nullable: true, description: 'Tax level code for the product' })
  taxLevelCode?: string;

  @Field(() => [DimensionInput], { nullable: true, description: 'List of dimensions pairs (type and value)' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true }) // Ensure each item in the array is validated
  @Type(() => DimensionInput)
  dimensions?: DimensionInput[];
}

@InputType({ description: 'Data to create a sales order, include header and lines' })
export class CreateSalesOrderInput {
  @Field(() => String, { description: 'Sales site' })
  @IsNotEmpty()
  salesSite: string;

  @Field(() => String, { nullable: true, description: 'Sales order type' })
  salesOrderType?: string;

  @Field(() => GraphQLDate, { nullable: true, description: 'Order date - YYYYMMDD' })
  orderDate?: Date;

  @Field(() => String, { description: 'Sold-to-customer code' })
  soldToCustomer: string;

  @Field(() => String, { nullable: true, description: 'Reference' })
  customerOrderReference?: string;

  @Field(() => String, { nullable: true, description: 'Delivery address code' })
  shipToCustomerAddress?: string;

  @Field(() => String, { nullable: true, description: 'Tax rule' })
  taxRule?: string;

  @Field(() => String, { nullable: true, description: 'Currency code' })
  currency?: string;

  @Field(() => Int, { nullable: true, description: 'Price -/+ tax' })
  priceIncludingOrExcludingTax?: number;

  @Field(() => String, { nullable: true, description: 'Shipment site' })
  shipmentSite?: string;

  @Field(() => GraphQLDate, { nullable: true, description: 'Requested delivery date - YYYYMMDD' })
  requestedDeliveryDate?: Date;

  @Field(() => GraphQLDate, { nullable: true, description: 'Shipment date - YYYYMMDD' })
  shipmentDate?: Date;

  @Field(() => String, { nullable: true, description: 'Payment term' })
  paymentTerm?: string;

  @Field(() => [CreateSalesOrderLineInput], { description: 'An array with all products to order.' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // Ensure each item in the array is validated
  @Type(() => CreateSalesOrderLineInput)
  lines: CreateSalesOrderLineInput[];
}
