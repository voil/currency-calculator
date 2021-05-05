import { Cache } from 'cache-manager';
import { Query, Resolver } from '@nestjs/graphql';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { CountriesService } from '../countries.service';
import { CountriesResponseType } from './countries.types';
import { BaseResolver } from '../../core/graphql/base.resolver';
import { ResponseEndpointInterface } from '../../../support/interfaces';

@Resolver()
export class CountriesResolver extends BaseResolver {
  /**
   * @var String cacheName
   */
  public static cacheName = 'COUNTIRES_CACHE';

  /**
   * Constructor of class.
   * @param CountriesService countriesService
   */
  constructor(
    private countriesService: CountriesService,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {
    super();
  }

  /**
   * Method to get countires list.
   * @return Promise<Array<ResponseEndpointInterface>>
   */
  @Query(() => CountriesResponseType)
  public async countriesList(): Promise<ResponseEndpointInterface> {
    const records = await this.getRecordsFromCache(this.countriesService);
    return {
      total: records.length,
      records,
    };
  }
}
