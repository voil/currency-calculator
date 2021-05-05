import { Field, ObjectType } from '@nestjs/graphql';

/**
 * ConversionType
 * Conversion types.
 */
@ObjectType()
export class ConversionType {
  @Field(type => Number, { description: `Current exchange rate` })
  exchangeRate: number;
}
