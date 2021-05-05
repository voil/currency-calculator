import { ConversionType } from './conversion.types';
import { Query, Resolver, Args } from '@nestjs/graphql';
import { ConversionService } from '../conversion.service';
import { CurrentExchangeRateArgs } from './conversion.args';
import { BaseResolver } from '../../core/graphql/base.resolver';
import { ResponseExchangeRateInterface } from '../../../support/interfaces';

@Resolver()
export class ConversionResolver extends BaseResolver {
  /**
   * Constructor of class.
   * @param ConversionService conversionService
   */
  constructor(private conversionService: ConversionService) {
    super();
  }

  /**
   * Method to get current exchange rate.
   * @param CurrentExchangeRateArgs params
   * @return Promise<ResponseEndpointInterface>
   */
  @Query(() => ConversionType)
  async getCurrentExchangeRate(
    @Args('params') params: CurrentExchangeRateArgs,
  ): Promise<ResponseExchangeRateInterface> {
    return {
      exchangeRate: await this.conversionService.getExchangeRate(
        params.from,
        params.to,
      ),
    };
  }
}
