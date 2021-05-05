import { Field, ObjectType } from '@nestjs/graphql';
import { RecordsListType } from '../../core/graphql/base.types';

/**
 * CountriesType
 * Countries types.
 */
@ObjectType()
export class CountriesType {
  @Field(type => String, { description: `Unique id identificator.` })
  id: string;

  @Field(type => String, { description: `Name of country.` })
  name: string;

  @Field(type => String, { description: `Unique of name country.` })
  alpha3: string;

  @Field(type => String, { description: `Unique of id country.` })
  currencyId: string;

  @Field(type => String, { description: `Name of currency.` })
  currencyName: string;

  @Field(type => String, { description: `Symbol of currency.` })
  currencySymbol: string;
}

/**
 * ProfilesResponseType
 * Profiles response type.
 *
 * @extends RecordsListType<TItem>
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
@ObjectType()
export class CountriesResponseType extends RecordsListType(CountriesType) {
  //...
}
