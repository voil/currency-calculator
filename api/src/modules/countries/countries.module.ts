import { CacheModule } from '@nestjs/common';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '../core/config.module';
import { CountriesService } from './countries.service';
import { ConfigService } from '../core/services/config.service';
import { CountriesResolver } from './graphql/countries.resolver';

/**
 * CountriesModule
 * Countries module.
 */
@Module({
  imports: [
    HttpModule,
    ConfigModule.register(),
    CacheModule.register({
      ttl: 60,
    }),
  ],
  providers: [ConfigService, CountriesService, CountriesResolver],
})
export class CountriesModule {}
