import { Cache } from 'cache-manager';
import { BaseService } from '../services/base.service';

/**
 * BaseResolver
 * Base resolver.
 */
export abstract class BaseResolver {
  /**
   * @var String|Null cacheName
   */
  protected cacheName: string | null = null;

  /**
   * @var Cache cacheManager
   */
  protected cacheManager: Cache;

  /**
   * Method to get records from cache.
   * @param BaseService service
   * @return Promise<Array<any>>
   */
  protected async getRecordsFromCache(
    service: BaseService,
  ): Promise<Array<any>> {
    const cache = await this.cacheManager.get(this.getCacheName());
    if (!cache) {
      await this.setRecordsToCache(service);
    }
    return await this.cacheManager.get(this.getCacheName());
  }

  /**
   * Method to get cache name.
   * @return String
   */
  protected getCacheName(cacheName: string | null = null): string {
    return `${cacheName || this.cacheName}`;
  }

  /**
   * Method to set list to cache.
   * @params BaseService service
   * @params ObjectLiteral where
   * @return Promise<void>
   */
  protected async setRecordsToCache(
    service: BaseService,
    cacheName?: string | null,
  ): Promise<void> {
    await this.cacheManager.set(
      this.getCacheName(cacheName),
      await service.getList(),
      null,
    );
  }
}
