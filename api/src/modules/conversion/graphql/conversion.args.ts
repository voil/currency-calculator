import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
} from 'class-validator';

/**
 * CurrentExchangeRateArgs
 * Get curretn exchange rate arguments.
 */
@InputType()
export class CurrentExchangeRateArgs {
  @Field({ nullable: false })
  @MinLength(2)
  @IsString()
  from: string;

  @Field({ nullable: false })
  @MinLength(2)
  @IsString()
  to: string;
}
