import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * RecordsListType
 * Function generic to create dynamic object type.
 *
 * @param Type<TItem> TItemClass
 * @return Class RecordsListType
 */
export function RecordsListType<TItem>(TItemClass: Type<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class RecordsListType {
    @Field(type => Number, {
      description: `Curent page response.`,
      nullable: true,
    })
    page?: Number;

    @Field(type => Number, { description: `Total records in response.` })
    total?: Number;

    @Field(type => [TItemClass], { description: `Records data.` })
    records?: TItem[];
  }

  return RecordsListType;
}
